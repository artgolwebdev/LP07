
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  import path from 'path'

  // Easy toggle: change this to false for production, true for development
  const isDev = false;

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    base: isDev ? '/' : '/LP07/',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  })