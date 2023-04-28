import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('_')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator
  ) {}

  @Get('/health')
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'http',
          `http://localhost:${
            this.config.get<string>('HTTP_PORT') ?? 8080
          }/_/check`
        ),
    ]);
  }

  @Get('/check')
  check() {
    return;
  }
}
