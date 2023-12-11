import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import env from './common/utils/env.helper';
import validateEnvironmentVariables from './common/validators/config.validator';
import { VideosModule } from './v1/domains/videos/videos.module';
import { ImportFeedModule } from './tasks/feeds/aggregate-import-tasks.module';
import { NewsModule } from './v1/domains/news/news.module';
import { HealthCheckModule } from './v1/domains/health/health-check.module';

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
    VideosModule,
    NewsModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
