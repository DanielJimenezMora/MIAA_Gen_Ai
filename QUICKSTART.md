# 🚀 Guía de Inicio Rápido - Travel Planner AI

## Pasos para ejecutar el proyecto

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Configurar API Key

**Opción A: Groq (RECOMENDADO - GRATUITO)**
```bash
cp .env.example .env
# Edita .env y agrega:
# GROQ_API_KEY=gsk-tu-clave-aqui
```

Obtén tu clave GRATIS en: https://console.groq.com/keys
- No requiere tarjeta de crédito
- Modelos open source de alta calidad
- Ultra rápido

**Opción B: OpenAI (requiere créditos)**
```bash
# En .env agrega:
# OPENAI_API_KEY=tu-clave-aqui
```

Obtén tu clave en: https://platform.openai.com/api-keys

**Opción C: Anthropic Claude (requiere créditos)**
```bash
# En .env agrega:
# ANTHROPIC_API_KEY=tu-clave-aqui
```

Obtén tu clave en: https://console.anthropic.com/

### 3. Iniciar el Servidor
```bash
pnpm dev
```

Abre http://localhost:4321 en tu navegador.

### 4. Probar la Aplicación

1. Completa el formulario con tus preferencias de viaje
2. Click en "Generar Itinerario"
3. Espera a que la IA genere tu plan personalizado

## Modo Demo (Sin API Key)

Si no configuras una API key, la aplicación funcionará en modo demo usando la base de conocimiento local (RAG), pero sin generación dinámica por IA.

## Deploy en Vercel

```bash
# Opción 1: Conectar GitHub
1. Sube el código a GitHub
2. Importa el repo en vercel.com
3. Configura OPENAI_API_KEY en Environment Variables
4. Deploy automático

# Opción 2: Deploy manual
pnpm build
npx vercel --prod
```

## Estructura de Carpetas Clave

- `src/components/TravelForm.tsx` - Formulario React
- `src/pages/api/generate-itinerary.ts` - API endpoint
- `src/lib/ai-service.ts` - Lógica de IA y prompts
- `src/data/travel-knowledge.ts` - Base de conocimiento (RAG)

## Requisitos del Sistema

- Node.js 18+
- pnpm (o npm/yarn)
- Conexión a internet (para llamadas a API)

## Soporte

Para problemas o preguntas:
- Revisa el README.md completo
- Verifica que la API key esté configurada correctamente
- Asegúrate de tener créditos en tu cuenta de OpenAI/Anthropic

---

