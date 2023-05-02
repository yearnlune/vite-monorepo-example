import { Module } from '@nestjs/common';
import { HealthModule } from '@config/health.module';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
