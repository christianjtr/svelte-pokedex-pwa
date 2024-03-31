import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      svelte(), 
      VitePWA({
        registerType: 'autoUpdate', 
        devOptions: {
          enabled: false
        },
        manifest: false,
      })
    ],
    base: isProduction ? '/svelte-pokedex-pwa' : '',
  }
});
