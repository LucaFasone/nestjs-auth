import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('health')
export class AppController {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  @Get()
  checkHealth(){
    return this.authClient.send('health',{})
  }
}
