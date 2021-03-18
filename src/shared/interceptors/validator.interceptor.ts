import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from '../contracts/contract';

import { ResultDto } from '../dtos/result.dto';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);
    if (!valid) {
      throw new HttpException(
        new ResultDto('Algo está errado!', false, null, this.contract.errors),
        HttpStatus.BAD_REQUEST,
      );
    }
    return next.handle();
  }
}
