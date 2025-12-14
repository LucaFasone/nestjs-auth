import { Services } from "@app/common";
import { ConfigService } from "@nestjs/config";
import { ClientsProviderAsyncOptions, Transport } from "@nestjs/microservices";

export const createMicroserviceConfig = (name: Services): ClientsProviderAsyncOptions => ({
    name,
    useFactory: (config: ConfigService) => ({
        transport: Transport.TCP,
        options: {
            host: config.get<string>(`${name}_HOST`),
            port: config.get<number>(`${name}_PORT`),
        }
    }),
    inject: [ConfigService],
})