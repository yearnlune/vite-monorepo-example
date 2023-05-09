import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (options: MongooseModuleOptions = {}) => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        return {
          uri: uri,
          ...options,
        };
      },
    }),
  ],
})
export class MockMongoModule {}

export function closeMongoMemoryServer() {
  if (mongoServer) {
    mongoServer.stop();
  }
}
