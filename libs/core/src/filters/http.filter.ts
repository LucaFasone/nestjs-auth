import { MicroserviceError } from "@app/common/interfaces/microservice-error.interface";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpFilter.name)
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        if (exception instanceof HttpException) {
            this.logger.error(exception)
            return response.status(Number(exception.getStatus())).json({
                timestamp: Date.now(),
                path: request.url,
                message: exception.getResponse()
            })
        }
        if (exception.error || exception.message) {
            const error = exception.error || exception
            if (this.isMicroserviceError(error)) {
                this.logger.error(error)
                return response.status(error.statusCode).json({
                    timestamp: Date.now(),
                    path: request.url,
                    message: error.message
                })
            }
        }
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Internal Server Error',
            ...(process.env.NODE_ENV !== 'production' && { stack: exception.stack })
        });
    }


    private isMicroserviceError(error: any): error is MicroserviceError {
        return typeof error === 'object' &&
            error !== null &&
            'statusCode' in error &&
            'message' in error;
    }

}
