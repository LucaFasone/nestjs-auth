import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
  @MessagePattern('health')
  health(){
    return {status:"Auth OK",timestamp:Date.now()}
  }
}
