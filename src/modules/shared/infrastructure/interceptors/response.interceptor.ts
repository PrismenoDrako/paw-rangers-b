import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponseDto } from '../api-response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Si el handler ya devolvió un ApiResponseDto, no lo modificamos
        if (data instanceof ApiResponseDto) return data;

        return new ApiResponseDto({
          status: 'success',
          data,
        });
      }),
    );
  }
}
