
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  import path from 'path'

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    base: '/LP07/',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion/react'],
            ui: ['@fancyapps/ui', 'lucide-react']
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 4173,
      open: true
    }
  })