import type { APIRoute } from 'astro';
import { generateItinerary } from '../../lib/ai-service';

// Configurar para Edge Runtime en Vercel
export const runtime = 'edge';

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
    
    // Error específico según el tipo
    const errorMessage = (error as Error).message;
    let userMessage = 'Error al generar itinerario.';
    
    if (errorMessage.includes('credit balance is too low')) {
      userMessage = 'API sin créditos disponibles. Verifica tu saldo o configura una API key diferente.';
    } else if (errorMessage.includes('API key')) {
      userMessage = 'API key no válida o no configurada correctamente.';
    } else if (errorMessage.includes('Ambas APIs fallaron')) {
      userMessage = 'Ambas APIs (OpenAI y Anthropic) fallaron. Verifica tus credenciales y saldos.';
    }
    
    return new Response(
      JSON.stringify({ error: userMessage }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
