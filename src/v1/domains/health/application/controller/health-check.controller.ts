import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { API_ROUTES } from 'src/common/constants/api-routes.constants';
import { API_TAGS } from 'src/common/constants/api-tags.constants';
import env from 'src/common/utils/env.helper';

@ApiTags(API_TAGS.healthCheck)
@Controller({
  path: API_ROUTES.healthCheck,
  version: env('EUROGAMER_DEFAULT_API_VERSION'),
})
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public checkHealth() {
    return this.health.check([]);
  }

  @Get('db')
  @HealthCheck()
  public checkDbHealth() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
