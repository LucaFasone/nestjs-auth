import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './schemas/validation.schema';

@Module({
  imports:[
    NestConfigModule.forRoot({
      isGlobal:true,
      envFilePath: './.env',
      validationSchema:validationSchema
    })
  ],
  providers: [ConfigService],
  exports: [NestConfigModule],
})
export class CustomConfig {}
