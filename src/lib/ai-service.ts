import 'dotenv/config';
import { ChatGroq } from '@langchain/groq';
import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { getSystemPrompt, getUserPrompt } from './prompts';
import { getDestinationInfo } from '../data/travel-knowledge';
import type { TravelPreferences } from '../types/itinerary';

// Función para búsqueda real en internet usando Serper API
async function searchInternet(query: string): Promise<string> {
  try {
    if (process.env.SERPER_API_KEY) {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.SERPER_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query, num: 6, hl: 'es' })
      });

      if (response.ok) {
        const data = await response.json();
        let searchResults = `Resultados de búsqueda para "${query}":\n`;
        if (data.organic && data.organic.length > 0) {
          data.organic.forEach((result: any) => {
            searchResults += `- ${result.title}: ${result.snippet}\n (Fuente: ${result.link})\n`;
          });
        }
        return searchResults;
      }
    }
    return `Búsqueda web no disponible.`;
  } catch (error) {
    console.error('Error en búsqueda de internet:', error);
    return `Error al buscar en internet.`;
  }
}

export async function generateItinerary(
  preferences: TravelPreferences
): Promise<{ itinerary?: string; needsSpecificData?: boolean }> {
  try {
    // Debug: Verificar variables de entorno
    console.log('� GROQ_API_KEY disponible:', !!process.env.GROQ_API_KEY);
    console.log('🔑 OPENAI_API_KEY disponible:', !!process.env.OPENAI_API_KEY);
    console.log('🔑 ANTHROPIC_API_KEY disponible:', !!process.env.ANTHROPIC_API_KEY);
    console.log('🔍 SERPER_API_KEY disponible:', !!process.env.SERPER_API_KEY);
    
    // Verificar que tengamos al menos una API key (prioridad: Groq > Anthropic > OpenAI)
    const hasGroq = !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here';
    const hasAnthropic = !!process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here';
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    
    if (!hasGroq && !hasAnthropic && !hasOpenAI) {
      throw new Error('Se requiere GROQ_API_KEY, ANTHROPIC_API_KEY o OPENAI_API_KEY válida');
    }

    // 1. Obtener información base (RAG)
    const destinationInfo = getDestinationInfo(preferences.destination);

    // 2. Obtener información de internet (Search)
    let internetInfo = '';
    
    // Construir query de búsqueda basada en intereses
    const interestQuery = preferences.interests.length > 0 
      ? `mejores sitios para ${preferences.interests.join(', ')} en ${preferences.destination}` 
      : `turismo en ${preferences.destination}`;
      
    // Búsqueda general de atracciones y novedades
    const generalQuery = `guía turística ${preferences.destination} ${new Date().getFullYear()} atracciones restaurantes`;
    
    // Ejecutar búsquedas en paralelo
    const [interestResults, generalResults] = await Promise.all([
      searchInternet(interestQuery),
      searchInternet(generalQuery)
    ]);
    
    internetInfo = `${interestResults}\n\n${generalResults}`;

    // 3. Construir Contexto
    let context = '';
    if (destinationInfo) {
      context += `\n\n--- INFORMACIÓN DE BASE DE DATOS (RAG) ---\n`;
      context += `Atracciones principales: ${destinationInfo.topAttractions.join(', ')}\n`;
      context += `Gastronomía: ${destinationInfo.cuisine.join(', ')}\n`;
      context += `Tips: ${destinationInfo.tips}\n`;
      if (destinationInfo.specificRestaurants) {
        context += `Restaurantes conocidos: ${destinationInfo.specificRestaurants.join(', ')}\n`;
      }
      if (destinationInfo.neighborhoods) {
        context += `Barrios recomendados: ${destinationInfo.neighborhoods.join(', ')}\n`;
      }
    }

    if (internetInfo) {
      context += `\n\n--- INFORMACIÓN DE INTERNET (ACTUALIZADA) ---\n`;
      context += internetInfo;
    }

    // 4. Intentar generar con LLMs (prioridad: Groq > Anthropic > OpenAI)
    const systemPrompt = getSystemPrompt(context);
    const userPrompt = getUserPrompt(preferences);

    let response;
    let usedModel = '';

    // 1ª opción: Groq (GRATIS y muy rápido)
    if (hasGroq) {
      try {
        console.log('Intentando con Groq (GRATIS)...');
        const model = new ChatGroq({
          model: 'llama-3.1-8b-instant', // Modelo Llama 3.1 más actual y estable
          temperature: 0.7,
          apiKey: process.env.GROQ_API_KEY,
        });

        response = await model.invoke([
          new SystemMessage(systemPrompt),
          new HumanMessage(userPrompt)
        ]);
        usedModel = 'Groq Llama3.1-8B';
        console.log('Éxito con Groq');
        
      } catch (groqError) {
        console.log('Groq falló:', (groqError as Error).message);
        
        // Si Groq falla, intentar con Anthropic
        if (hasAnthropic) {
          console.log('Intentando con Anthropic como fallback...');
          try {
            const model = new ChatAnthropic({
              model: 'claude-3-5-sonnet-20241022',
              temperature: 0.7,
              apiKey: process.env.ANTHROPIC_API_KEY,
            });

            response = await model.invoke([
              new SystemMessage(systemPrompt),
              new HumanMessage(userPrompt)
            ]);
            usedModel = 'Anthropic Claude';
            console.log('Éxito con Anthropic como fallback');
            
          } catch (anthropicError) {
            console.log('Anthropic también falló:', (anthropicError as Error).message);
            
            // Si Anthropic también falla, intentar con OpenAI
            if (hasOpenAI) {
              console.log('Intentando con OpenAI como último recurso...');
              try {
                const { ChatOpenAI } = await import('@langchain/openai');
                const openaiModel = new ChatOpenAI({
                  model: 'gpt-4o-mini',
                  temperature: 0.7,
                  apiKey: process.env.OPENAI_API_KEY,
                });

                response = await openaiModel.invoke([
                  new SystemMessage(systemPrompt),
                  new HumanMessage(userPrompt)
                ]);
                usedModel = 'OpenAI GPT';
                console.log('Éxito con OpenAI como último recurso');
                
              } catch (openaiError) {
                console.log('OpenAI también falló:', (openaiError as Error).message);
                throw new Error(`Todas las APIs fallaron. Groq: ${(groqError as Error).message}. Anthropic: ${(anthropicError as Error).message}. OpenAI: ${(openaiError as Error).message}`);
              }
            } else {
              throw new Error(`Groq y Anthropic fallaron. Groq: ${(groqError as Error).message}. Anthropic: ${(anthropicError as Error).message}`);
            }
          }
        } else if (hasOpenAI) {
          // Solo OpenAI disponible como fallback
          console.log('Intentando con OpenAI como fallback...');
          try {
            const { ChatOpenAI } = await import('@langchain/openai');
            const openaiModel = new ChatOpenAI({
              model: 'gpt-4o-mini',
              temperature: 0.7,
              apiKey: process.env.OPENAI_API_KEY,
            });

            response = await openaiModel.invoke([
              new SystemMessage(systemPrompt),
              new HumanMessage(userPrompt)
            ]);
            usedModel = 'OpenAI GPT';
            console.log('Éxito con OpenAI como fallback');
            
          } catch (openaiError) {
            console.log('OpenAI también falló:', (openaiError as Error).message);
            throw new Error(`Groq y OpenAI fallaron. Groq: ${(groqError as Error).message}. OpenAI: ${(openaiError as Error).message}`);
          }
        } else {
          throw groqError;
        }
      }
    } 
    // 2ª opción: Anthropic (si no hay Groq)
    else if (hasAnthropic) {
      try {
        console.log('🤖 Intentando con Anthropic Claude...');
        const model = new ChatAnthropic({
          model: 'claude-3-5-sonnet-20241022',
          temperature: 0.7,
          apiKey: process.env.ANTHROPIC_API_KEY,
        });

        response = await model.invoke([
          new SystemMessage(systemPrompt),
          new HumanMessage(userPrompt)
        ]);
        usedModel = 'Anthropic Claude';
        console.log('Éxito con Anthropic Claude');
        
      } catch (anthropicError) {
        console.log('Anthropic falló:', (anthropicError as Error).message);
        
        // Si Anthropic falla, intentar con OpenAI
        if (hasOpenAI) {
          console.log('Intentando con OpenAI como fallback...');
          try {
            const { ChatOpenAI } = await import('@langchain/openai');
            const openaiModel = new ChatOpenAI({
              model: 'gpt-4o-mini',
              temperature: 0.7,
              apiKey: process.env.OPENAI_API_KEY,
            });

            response = await openaiModel.invoke([
              new SystemMessage(systemPrompt),
              new HumanMessage(userPrompt)
            ]);
            usedModel = 'OpenAI GPT';
            console.log('Éxito con OpenAI como fallback');
            
          } catch (openaiError) {
            console.log('OpenAI también falló:', (openaiError as Error).message);
            throw new Error(`Ambas APIs fallaron. Anthropic: ${(anthropicError as Error).message}. OpenAI: ${(openaiError as Error).message}`);
          }
        } else {
          throw anthropicError;
        }
      }
    } 
    // 3ª opción: Solo OpenAI disponible
    else if (hasOpenAI) {
      console.log('Usando OpenAI GPT...');
      const { ChatOpenAI } = await import('@langchain/openai');
      const openaiModel = new ChatOpenAI({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        apiKey: process.env.OPENAI_API_KEY,
      });

      response = await openaiModel.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);
      usedModel = 'OpenAI GPT';
      console.log('Éxito con OpenAI');
    }

    if (!response) {
      throw new Error('No se pudo generar respuesta con ningún modelo');
    }

    console.log(`Itinerario generado exitosamente usando: ${usedModel}`);
    return { itinerary: response.content as string };

  } catch (error) {
    console.error('Error completo:', error);
    throw error; // Re-lanzar el error para que se maneje en la API route
  }
}

