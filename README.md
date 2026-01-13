# Travel Planner AI

Aplicación de planificación de viajes inteligente que utiliza IA generativa (LLMs), RAG (Retrieval-Augmented Generation) y herramientas externas para crear itinerarios personalizados.

## Características

- **Prompt Engineering**: Sistema de prompts optimizado para generar itinerarios detallados
- **RAG (Retrieval-Augmented Generation)**: Base de conocimiento de destinos turísticos integrada
- **LLMs**: Integración con OpenAI (GPT-4) y Anthropic (Claude)
- **Tool Use**: Capacidad para integrar APIs en tiempo real (clima, vuelos, eventos)
- **React + Astro**: Interfaz moderna y ultra-rápida
- **TypeScript**: Código tipado y robusto
- **Tailwind CSS**: Diseño responsive y atractivo

## Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- API Key de OpenAI o Anthropic

### Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu OPENAI_API_KEY o ANTHROPIC_API_KEY

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

## Configuración de API Keys

### Opción 1: Groq (RECOMENDADO - GRATUITO)

**Completamente gratis con modelos open source de alta calidad**

1. Crea una cuenta en [Groq Console](https://console.groq.com/)
2. Ve a [API Keys](https://console.groq.com/keys) y genera una nueva
3. Agrega a tu archivo `.env`:
```env
GROQ_API_KEY=gsk-...
```

**Ventajas:**
- 100% gratuito
- Ultra rápido (hardware LPU)
- Modelos excelentes (Llama 3.3 70B, Mixtral)
- Sin límites de créditos

📖 Ver [GROQ_SETUP.md](GROQ_SETUP.md) para guía detallada

### Opción 2: OpenAI (Requiere créditos)

1. Crea una cuenta en [OpenAI](https://platform.openai.com/)
2. Genera una API key en la sección de API Keys
3. Agrega a tu archivo `.env`:
```env
OPENAI_API_KEY=sk-proj-...
```

### Opción 3: Anthropic Claude (Requiere créditos)

1. Crea una cuenta en [Anthropic](https://console.anthropic.com/)
2. Genera una API key
3. Agrega a tu archivo `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Opción 4: Modo Demo (Sin API key)

Si no configuras ninguna API key, la aplicación funciona en modo demo usando solo la base de conocimiento local (RAG).

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   └── TravelForm.tsx
│   ├── data/           # Base de conocimiento (RAG)
│   │   └── travel-knowledge.ts
│   ├── layouts/        # Layouts de Astro
│   │   └── Layout.astro
│   ├── lib/            # Servicios y utilidades
│   │   └── ai-service.ts
│   ├── pages/          # Rutas y API endpoints
│   │   ├── index.astro
│   │   └── api/
│   │       └── generate-itinerary.ts
│   └── styles/         # Estilos globales
│       └── global.css
├── .env.example        # Template de variables de entorno
├── astro.config.mjs    # Configuración de Astro
├── package.json
└── README.md
```

## 🎓 Componentes Técnicos

### 1. Prompt Engineering

El sistema utiliza prompts estructurados y optimizados en `src/lib/ai-service.ts`:

- **System Prompt**: Define el rol del asistente y las instrucciones detalladas
- **User Prompt**: Estructura las preferencias del usuario
- **Formato específico**: Guía al LLM para generar itinerarios consistentes

### 2. RAG (Retrieval-Augmented Generation)

Base de conocimiento en `src/data/travel-knowledge.ts`:

- 10+ destinos con información detallada
- Atracciones, gastronomía, cultura, tips
- Búsqueda contextual antes de generar itinerarios
- Evita alucinaciones del modelo con datos verificados

### 3. Tool Use

**Implementado**: Sistema preparado para integrar APIs externas
**Próximas integraciones**:
- API de clima en tiempo real
- Precios de vuelos actualizados
- Eventos y festivales locales
- Disponibilidad de hoteles

## 🛠️ Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Construye el sitio para producción en `./dist/` |
| `pnpm preview` | Vista previa del build local |
| `pnpm astro check` | Verifica tipos TypeScript |

## 📊 Funcionalidad

1. **Formulario de Preferencias**: Usuario ingresa destino, duración, presupuesto, intereses
2. **Procesamiento**: API route recibe datos y consulta base de conocimiento
3. **Generación con LLM**: Se envía contexto + preferencias al modelo
4. **Respuesta**: Itinerario detallado día por día con recomendaciones personalizadas

## 🎥 Video Demostrativo

[Enlace al video en YouTube/Vimeo] - _Próximamente_

En el video se explica:
- Arquitectura del sistema
- Implementación de Prompt Engineering
- Funcionamiento de RAG
- Demo en vivo de la aplicación
- Limitaciones y mejoras futuras

## 🔮 Roadmap

- [ ] Integrar API de clima en tiempo real
- [ ] Conectar con APIs de vuelos (Skyscanner/Amadeus)
- [ ] Implementar vector store para RAG avanzado (Pinecone/Weaviate)
- [ ] Agregar autenticación de usuarios
- [ ] Sistema de favoritos y historial
- [ ] Generación de PDFs descargables
- [ ] Soporte multiidioma
- [ ] Chat interactivo para refinar itinerarios

## Contribuciones

Proyecto académico para la Maestría en Inteligencia Artificial.
Desarrollado como parte de la asignatura de IA Generativa.


## Autor

**Daniel Armando Jiménez Mora**
- Maestría en Inteligencia Artificial Aplicada

---

**⚡ Hecho con Astro + React + LangChain **
