import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { createJwtConfig } from '@app/config/factories/jwt.factory';
import { JwtStrategy } from './jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { createMicroserviceConfig } from '@app/config';
import { Services } from '@app/common';

@Module({
  imports:[
    JwtModule.registerAsync(createJwtConfig()),
    ClientsModule.registerAsync([
      createMicroserviceConfig(Services.AUTH)
    ]),
  ],
  controllers: [AuthController],
  providers:[JwtStrategy],
  exports: [ClientsModule]
})
export class AuthModule {}
