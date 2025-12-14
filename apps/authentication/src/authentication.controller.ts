import { Controller,} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Auth } from '@app/common';

@Controller()
export class AuthenticationController {
  @MessagePattern(Auth.HEALTH)
  health() {
    return { status: "Auth OK", timestamp: Date.now() }
  }
}
