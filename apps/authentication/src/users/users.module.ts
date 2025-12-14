import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { createJwtConfig } from '@app/config/factories/jwt.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(createJwtConfig())
  ],
  controllers: [UsersController],
  providers: [UsersService,
    UsersRepository
  ],
  exports:[UsersService]
})
export class UsersModule { }
