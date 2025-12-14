import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { CustomConfig } from '@app/config'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule,
    CustomConfig,
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
