import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import env from './common/utils/env.helper';
import validateEnvironmentVariables from './common/validators/config.validator';
import { VideosModule } from './domains/videos/videos.module';
import { ImportFeedModule } from './tasks/feeds/aggregate-import-tasks.module';
import { NewsModule } from './domains/news/news.module';

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
        host: env('EUROGAMER_DATABASE_HOST'),
        port: env.int('EUROGAMER_DATABASE_PORT'),
        username: env('EUROGAMER_DATABASE_USER'),
        password: env('EUROGAMER_DATABASE_PASSWORD'),
        database: env('EUROGAMER_DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: env.bool('EUROGAMER_DATABASE_SYNCHRONIZE'),
      }),
    }),
    VideosModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
