import { defineConfig } from 'vite';
import path from 'path';
import { createRequire } from 'module';


// Create a require function to resolve paths like CommonJS
const require = createRequire(import.meta.url);

export default defineConfig({
  root: './',  // Entry point directory
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'openapiToTsInterface',
      fileName: (format) => `openapi-to-ts-interface.${format}.js`,
    },
    rollupOptions: {
      treeshake: 'smallest'
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Map `@` to `src/`
      // Alias for node core modules to polyfills
      'node:stream': require.resolve('stream-browserify'),
      'node:url': path.resolve(__dirname, 'url.js'),
      'node:buffer': require.resolve('buffer'),
      'node:path': require.resolve('path-browserify'),
      'node:perf_hooks': path.resolve(__dirname, 'performance.js')
    },
    extensions: ['.ts', '.js'],
  },
  define: {
    'global': {},
    'process.env': {},  // Mocking process.env to avoid issues with node core modules
  },
  optimizeDeps: {
    include: ['stream-browserify', 'url', 'buffer'],  // Include these modules for dependency optimization
  },
  mode: 'production',  // Switch to 'development' for debugging
});
