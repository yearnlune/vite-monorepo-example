import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: parseInt(process.env.HTTP_PORT || '8080'),
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      tsCompiler: 'swc',
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optional dependencies, mark them as ignored for now
    exclude: [
      '@grpc/proto-loader',
      '@grpc/grpc-js',
      '@nestjs/platform-socket.io',
      '@nestjs/websockets',
      '@nestjs/microservices',
      '@nestjs/sequelize',
      '@nestjs/typeorm',
      'amqp-connection-manager',
      'amqplib',
      'cache-manager',
      'class-transformer',
      'class-transformer/storage',
      'kafkajs',
      'mqtt',
      'nats',
      'redis',
      'reflect-metadata',
    ],
  },
});
