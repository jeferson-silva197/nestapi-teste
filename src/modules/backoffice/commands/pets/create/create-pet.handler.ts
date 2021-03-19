import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PetRepository } from 'src/modules/backoffice/repositories/pet.repository';

import { CreatePetCommand } from './create-pet.command';

@CommandHandler(CreatePetCommand)
export class CreatePetHandler implements ICommandHandler<CreatePetCommand> {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: CreatePetCommand): Promise<any> {
    await this.repository.create(command.document, command.pet);
  }
}
