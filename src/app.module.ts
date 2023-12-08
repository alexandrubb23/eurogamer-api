import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import validateEnvironmentVariables from './common/validators/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
