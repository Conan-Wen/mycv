import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {}; // eslint-disable-line @typescript-eslint/ban-types
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: Type) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // // Run something before a request is handle
    // // by the request handler
    // console.log("I'm running before the handler", context);

    return next.handle().pipe(
      map((data: any) => {
        // // Run something before the response is sent out
        // console.log("I'm running before response is sent out", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
