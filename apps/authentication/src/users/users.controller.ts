import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { Auth, CreateUserDTO } from '@app/common';
import { LoginDTO } from '@app/common/dto/login.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern(Auth.REGISTER)
  register(@Payload() user: CreateUserDTO) {
    return this.usersService.create(user)
  }
  @MessagePattern(Auth.LOGIN)
  login(@Payload() userData: LoginDTO){
    return this.usersService.login(userData)
  }

  @MessagePattern(Auth.GET_ME)
  getMe(@Payload() data: { userId: string }) {
    return this.usersService.me(data.userId)
  }
  @MessagePattern(Auth.GET_USERS)
  getUsers(){
    return this.usersService.findAll()
  }
}
