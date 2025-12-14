import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const createJwtConfig = () => ({
    useFactory: (config:ConfigService):JwtModuleOptions => ({
        secret:config.get('JWT_SECRET'),
        signOptions:{
            expiresIn:'3600s'
        }
    }),
    inject:[ConfigService]
})
