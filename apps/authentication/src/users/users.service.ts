import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDTO, JWTPayload } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '@app/common/dto/login.dto';
import * as bcrypt from 'bcrypt'
import { RpcException } from '@nestjs/microservices';
import { MicroserviceError } from '@app/common/interfaces/microservice-error.interface';
import { plainToInstance } from 'class-transformer';
import { UserRTO } from '@app/common/dto/user.rto';
@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) { }

    async create({ email, password, username }: CreateUserDTO) {
        const userAlredyExits = await this.userRepository.findByEmail(email)
        if (userAlredyExits) {
            throw new RpcException({
                message: "User alredy exits",
                statusCode: 400
            } as MicroserviceError)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userRepository.create({ email, password: hashedPassword, username })
        return {
            access_token: await this.jwtService.signAsync({ id: user._id.toString(), email: user.email } as JWTPayload),
            user: plainToInstance(UserRTO, user.toObject(), { excludeExtraneousValues: true })
        }
    }
    async login({ email, password }: LoginDTO) {
        const user = await this.userRepository.findByEmail(email)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new RpcException({
                message: "User not found or incorrect password",
                statusCode: HttpStatus.UNAUTHORIZED
            } as MicroserviceError)
        }
        //this is not really need it but it is a layer of protection
        if (await bcrypt.compare(password, user.password)) {
            return {
                access_token: await this.jwtService.signAsync({ id: user._id.toString(), email: user.email } as JWTPayload),
                user: plainToInstance(UserRTO, user.toObject(), { excludeExtraneousValues: true })
            }
        }
    }
    async findAll() {

        const users = await this.userRepository.findAll()
        return users.map(user => plainToInstance(UserRTO, user.toObject(), { excludeExtraneousValues: true }))
    }

    async me(userId: string) {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw new RpcException({
                message: "User not found",
                statusCode: HttpStatus.NOT_FOUND
            } as MicroserviceError)
        }
        return plainToInstance(UserRTO, user.toObject(), { excludeExtraneousValues: true })
    }
}
