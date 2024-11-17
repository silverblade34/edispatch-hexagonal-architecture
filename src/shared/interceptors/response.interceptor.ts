import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

interface Response<T> {
    success: boolean;
    data: T | null;
    message: string;
    statusCode?: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data,
                message: 'Operación exitosa',
                statusCode: context.switchToHttp().getResponse().statusCode,
            })),
            catchError((error) => {
                const response: Response<null> = {
                    success: false,
                    data: null,
                    message: error.response?.message || error.message || 'Operación fallida',
                    statusCode: error.status || 500,
                };

                return throwError(() => new HttpException(response, response.statusCode));
            })
        );
    }
}