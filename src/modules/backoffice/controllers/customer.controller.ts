import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { CreateAccountCommand } from '../commands/account/create-account.command';
import { CreateCustomerCommand } from '../commands/customer/create-customer.command';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import findByDocumentQuery from '../queries/customer/find-by-document.query';

import { CustomerCommandService } from '../services/customer/customer-command.service';
import { CustomerQueryService } from '../services/customer/customer-query.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly customerCommandService: CustomerCommandService,
    private readonly customerQueryService: CustomerQueryService,
  ) {}

  @Post()
  async post(@Body() model: CreateCustomerDto): Promise<ResultDto> {
    const createAccountCommand = new CreateAccountCommand(
      new User(
        null,
        model.username,
        model.email,
        ['user'],
        model.password,
        true,
      ),
    );
    const createCustomerCommand = new CreateCustomerCommand(
      new Customer(
        model.name,
        model.document,
        model.email,
        null,
        null,
        null,
        null,
        null,
      ),
    );
    await this.customerCommandService.create(
      createCustomerCommand,
      createAccountCommand,
    );

    return new ResultDto(
      'Usuário cadastrado com sucesso!!',
      true,
      model.username,
      null,
    );
  }

  @Get(':document')
  async getByDocument(@Param('document') document: string): Promise<ResultDto> {
    const res = await this.customerQueryService.findbyDocument(
      new findByDocumentQuery(document),
    );
    return new ResultDto('Clientes obtidos com sucesso!', true, res, null);
  }
}
