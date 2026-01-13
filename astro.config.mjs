// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Removemos output y adapter para configuración estática por defecto
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});