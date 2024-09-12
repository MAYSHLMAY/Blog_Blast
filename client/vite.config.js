import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://blog-blast-backend.onrender.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
