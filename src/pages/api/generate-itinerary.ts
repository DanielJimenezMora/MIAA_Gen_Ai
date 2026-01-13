import type { APIRoute } from 'astro';
import { generateItinerary } from '../../lib/ai-service';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { preferences, specificData } = body;
    
    // Validar datos de entrada
    if (!preferences || !preferences.destination || !preferences.duration) {
      return new Response(
        JSON.stringify({ error: 'Destino y duración son requeridos' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generar itinerario usando LLM + RAG
    const result = await generateItinerary(preferences);
    
    // Devolver el itinerario generado por el LLM
    return new Response(JSON.stringify({ itinerary: result.itinerary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error en API:', error);
    console.error('Error stack:', (error as Error).stack);
    
    // Error específico según el tipo
    const errorMessage = (error as Error).message;
    let userMessage = 'Error al generar itinerario.';
    
    // Más detalles para desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error('Error completo para desarrollo:', {
        message: errorMessage,
        stack: (error as Error).stack,
        env: {
          GROQ_API_KEY: !!process.env.GROQ_API_KEY,
          ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
          OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        }
      });
    }
    
    if (errorMessage.includes('credit balance is too low')) {
      userMessage = 'API sin créditos disponibles. Verifica tu saldo o configura una API key diferente.';
    } else if (errorMessage.includes('API key') || errorMessage.includes('Invalid API Key')) {
      userMessage = 'API key no válida o no configurada correctamente.';
    } else if (errorMessage.includes('Ambas APIs fallaron') || errorMessage.includes('Todas las APIs fallaron')) {
      userMessage = 'Todas las APIs fallaron. Verifica tus credenciales y saldos.';
    } else if (errorMessage.includes('Se requiere') && errorMessage.includes('API_KEY')) {
      userMessage = 'No se encontraron API keys válidas configuradas.';
    }
    
    return new Response(
      JSON.stringify({ 
        error: userMessage,
        debug: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
