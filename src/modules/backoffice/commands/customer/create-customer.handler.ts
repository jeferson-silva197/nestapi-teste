import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Customer } from 'src/modules/backoffice/models/customer.model';

import { CustomerRepository } from 'src/modules/backoffice/repositories/customer.repository';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    private readonly repository: CustomerRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateCustomerCommand): Promise<Customer> {
    console.log('CommandHandler: Funcao conexao com repository iniciada...');
    let customer = await this.repository.findByDocument(
      command.customer.document,
    );
    if (!customer) {
      customer = this.publisher.mergeObjectContext(
        await this.repository.create(command.customer),
      );
      //customer.create();

      return customer;
    }

    throw new HttpException(
      'Verifique os dados, esse documento já tem cadastro ativo!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
