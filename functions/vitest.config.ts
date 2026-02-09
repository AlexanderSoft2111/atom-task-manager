import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar 'describe', 'test', 'expect' sin importarlos cada vez
    environment: 'node', // Simulamos un entorno de servidor (no de navegador)
  },
});