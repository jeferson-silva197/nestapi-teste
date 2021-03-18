import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../../commands/account/create-account.command';
import { CreateCustomerCommand } from '../../commands/customer/create-customer.command';

@Injectable()
export class CustomerCommandService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(
    createCustomerCommand: CreateCustomerCommand,
    createAccountCommand: CreateAccountCommand,
  ) {
    const account = await this.commandBus.execute(createAccountCommand);
    createCustomerCommand.customer.user = account;
    await this.commandBus.execute(createCustomerCommand);
  }
}
