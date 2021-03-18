import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories/customer.repository';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand> {
  constructor(public readonly repository: CustomerRepository) {}
  async execute(command: DeleteCustomerCommand): Promise<any> {
    await this.repository.delete(command.document);
  }
}
