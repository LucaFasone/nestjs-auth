import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggerInterceptor.name);

     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const {method,url} = ctx.getRequest<Request>()
        const now = Date.now()
        return next.handle().pipe(
            tap(() => {
                const time = Date.now() - now
                this.logger.log(`${method} ${url} - ${time}ms`)
            })
        )
    }
}