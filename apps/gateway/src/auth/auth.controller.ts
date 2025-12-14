import { Auth, CreateUserDTO, Services } from '@app/common';
import { LoginDTO } from '@app/common/dto/login.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(@Inject(Services.AUTH) private readonly authClient: ClientProxy) { }
    @Post('register')
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    register(@Body() user: CreateUserDTO) {
        return this.authClient.send(Auth.REGISTER, user)

    }
    @Post('login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpCode(HttpStatus.OK)
    login(@Body() user: LoginDTO) {
        return this.authClient.send(Auth.LOGIN, user)

    }
    @Get('users')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(CacheInterceptor)
    getUsers() {
        return this.authClient.send(Auth.GET_USERS, {})
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    getMe(@Req() req) {
        return this.authClient.send(Auth.GET_ME, { userId: req.user.userId })
    }
}
