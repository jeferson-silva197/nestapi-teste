import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoleInterceptor } from 'src/shared/interceptors/role.interceptor';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateAccountCommand } from '../commands/accounts/create-account.command';
import { CreateCustomerCommand } from '../commands/customers/create/create-customer.command';
import { DeleteCustomerCommand } from '../commands/customers/delete/delete-customer.command';
import { UpdateCustomerCommand } from '../commands/customers/update/update-customer.command';

import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { FindByDocumentQuery } from '../queries/customer/find-by-document.query';

import { FindAllDocumentsQuery } from '../queries/customer/get-all.query';

import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto): Promise<ResultDto> {
    try {
      const createAccountCommand = new CreateAccountCommand(
        model.document,
        model.email,
        ['user'],
        model.password,
      );
      const createCustomerCommand = new CreateCustomerCommand(
        model.name,
        model.email,
        model.document,
        null,
      );
      await this.customerService.create(
        createCustomerCommand,
        createAccountCommand,
      );

      return new ResultDto(
        'Usuário cadastrado com sucesso!!',
        true,
        model.username,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao inserir cadastro', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':document')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['user']))
  async getByDocument(@Param('document') document: string): Promise<ResultDto> {
    try {
      const response = await this.customerService.findbyDocument(
        new FindByDocumentQuery(document),
      );
      return new ResultDto('Cliente obtido com sucesso!', true, response, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao buscar usuário!', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  async getAll(): Promise<ResultDto> {
    const res = await this.customerService.findAll(new FindAllDocumentsQuery());
    return new ResultDto('Clientes obtidos com sucesso!', true, res, null);
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async put(
    @Body() body: UpdateCustomerDto,
    @Param('document') document: string,
  ): Promise<ResultDto> {
    try {
      const command = new UpdateCustomerCommand(document, body.name);
      await this.customerService.update(command);

      return new ResultDto(
        'Cliente atualizado com sucesso!',
        true,
        { body, document },
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar os dados!',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete(':document')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['admin']))
  async delete(@Param('document') document: string): Promise<ResultDto> {
    try {
      const command = new DeleteCustomerCommand(document);
      await this.customerService.delete(command);
      return new ResultDto(
        'Cliente removido com sucesso!',
        true,
        document,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto('Não foi possível remover os dados!', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
