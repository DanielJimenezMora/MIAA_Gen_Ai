import type { APIRoute } from 'astro';

// Configurar para server-side rendering
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    // Solo mostrar si las keys existen (no los valores)
    const envStatus = {
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      SERPER_API_KEY: !!process.env.SERPER_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({ 
      status: 'API Debug Info', 
      environment: envStatus 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};