import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../commands/account/create-account.command';
import { CreateCustomerCommand } from '../commands/customer/create-customer.command';
import { DeleteCustomerCommand } from '../commands/customer/delete-customer.command';
import { UpdateCustomerCommand } from '../commands/customer/update-customer.command';
import { FindByDocumentQuery } from '../queries/customer/find-by-document.query';
import { FindAllDocumentsCommand } from '../queries/customer/get-all.query';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(
    createCustomerCommand: CreateCustomerCommand,
    createAccountCommand: CreateAccountCommand,
  ) {
    //Verificando se existe customer com documento
    const hasCustomer = await this.queryBus.execute(
      new FindByDocumentQuery(createCustomerCommand.document),
    );
    if (hasCustomer) {
      throw new Error('Já existe um usuário com este documento!');
    }
    //Iniciando comandos de cadastro dos usuarios
    const account = await this.commandBus.execute(createAccountCommand);

    createCustomerCommand.user = account;

    await this.commandBus.execute(createCustomerCommand);
  }

  async update(command: UpdateCustomerCommand) {
    await this.commandBus.execute(command);
  }

  async delete(command: DeleteCustomerCommand) {
    await this.commandBus.execute(command);
  }

  async findbyDocument(getCustomerQuery: FindByDocumentQuery) {
    return await this.queryBus.execute(getCustomerQuery);
  }
  async findAll(command: FindAllDocumentsCommand) {
    return await this.queryBus.execute(command);
  }
}
