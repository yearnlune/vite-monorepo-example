import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        mongoose.set(
          'debug',
          configService.get<boolean>('MONGO_SHOW_QUERY') || false,
        );

        return {
          uri: configService.get<string>('MONGO_DB_URL'),
          dbName: configService.get<string>('MONGO_DB_NAME'),
          user: configService.get<string>('MONGO_DB_USERNAME'),
          pass: configService.get<string>('MONGO_DB_PASSWORD'),
        };
      },
    }),
  ],
})
export class MongoModule {}
