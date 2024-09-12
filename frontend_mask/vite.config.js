import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://blog-blast-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      
    },
 
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react/jsx-runtime'] // Add other external modules here if needed
    }
  }
});
