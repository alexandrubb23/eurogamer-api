import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportFeedsModule } from './tasks/feeds/import-feeds.module';
import env from './common/utils/env.helper';
import validateEnvironmentVariables from './common/validators/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
    ScheduleModule.forRoot(),
    ImportFeedsModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
