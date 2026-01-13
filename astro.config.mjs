// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Configuración estática por defecto - API routes funcionan automáticamente
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});