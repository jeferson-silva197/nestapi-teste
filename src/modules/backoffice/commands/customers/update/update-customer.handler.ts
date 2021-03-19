import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from 'src/modules/backoffice/repositories/customer.repository';

import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand> {
  constructor(private readonly repository: CustomerRepository) {}
  async execute(command: UpdateCustomerCommand): Promise<any> {
    return await this.repository.update(command);
  }
}
