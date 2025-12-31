import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: '.' })],

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },

  build: {
    // 👇 Yahi main fix — SSR disabled
    ssr: false,
    minify: 'terser',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three')) return 'three-vendor';
          if (id.includes('framer-motion') || id.includes('gsap')) return 'animation-vendor';
          if (id.includes('@headlessui/react') || id.includes('lucide-react')) return 'ui-vendor';
        },
      },
    },
  },

  optimizeDeps: {
    include: ['three', 'framer-motion', 'gsap', '@headlessui/react'],
  },
});
