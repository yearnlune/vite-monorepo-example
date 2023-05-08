import { Module } from '@nestjs/common';
import { UserModule } from '@/domain/user/user.module';

@Module({
  imports: [UserModule],
})
export class DomainModule {}
