import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddressRepository } from '../../repositories/address.repository';
import { CreateAddressCommand } from './create-address.command';

@CommandHandler(CreateAddressCommand)
export class CreateAddressHandler
  implements ICommandHandler<CreateAddressCommand> {
  constructor(private readonly repository: AddressRepository) {}
  async execute(command: CreateAddressCommand): Promise<any> {
    return await this.repository.create(
      command.document,
      command.address,
      command.addressType,
    );
  }
}
