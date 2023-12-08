import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportFeedsModule } from './tasks/feeds/import-feeds.module';
import validateEnvironmentVariables from './common/validators/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
    ScheduleModule.forRoot(),
    ImportFeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
