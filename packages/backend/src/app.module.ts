import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from '@/domain/domain.module';
import { HealthModule } from '@config/health.module';
import { MongoModule } from '@config/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    MongoModule,
    HealthModule,
    DomainModule,
  ],
})
export class AppModule {}
