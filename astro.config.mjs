// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Configuración estática por defecto con soporte para API routes
  output: 'static',
  adapter: vercel(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});