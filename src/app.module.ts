import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import env from './common/utils/env.helper';
import validateEnvironmentVariables from './common/validators/config.validator';
import { ImportFeedModule } from './tasks/feeds/aggregate-import-tasks.module';
import { ApiDomainsModule } from './v1/domains/api-domains.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ImportFeedModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: env('EUROGAMER_DB_HOST'),
        port: env.int('EUROGAMER_DB_PORT'),
        username: env('EUROGAMER_DB_USERNAME'),
        password: env('EUROGAMER_DB_PASSWORD'),
        database: env('EUROGAMER_DB_NAME'),
        autoLoadEntities: true,
        synchronize: env.bool('EUROGAMER_DATABASE_SYNCHRONIZE', false),
      }),
    }),
    ApiDomainsModule,
  ],
})
export class AppModule {}
