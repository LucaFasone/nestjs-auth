import { Auth, Services } from '@app/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('health')
export class AppController {
  constructor(@Inject(Services.AUTH) private authClient: ClientProxy) { }

  @Get()
  checkHealth() {
    return this.authClient.send(Auth.HEALTH, {})
  }
}
