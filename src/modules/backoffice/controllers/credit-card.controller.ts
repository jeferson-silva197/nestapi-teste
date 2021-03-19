import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateCreditCardCommand } from '../commands/creditcards/create-credit-card.command';
import { CreditCardContract } from '../contracts/creditcard/credit-card.contract';
import { CreditCard } from '../models/credit-card.model';
import { CreditCardService } from '../services/credit-card.service';

@Controller('v1/customers')
export class CreditCardController {
  constructor(private readonly service: CreditCardService) {}

  @UseInterceptors(new ValidatorInterceptor(new CreditCardContract()))
  @Post(':document/credit-card')
  async create(@Param('document') document: string, @Body() data: CreditCard) {
    try {
      const command = new CreateCreditCardCommand(document, data);
      await this.service.update(command);
      return new ResultDto(
        'Cartão de credito inserido com  sucesso!',
        true,
        data,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi atualizar o cartão de crédito!',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
