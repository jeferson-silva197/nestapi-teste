import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PetRepository } from 'src/modules/backoffice/repositories/pet.repository';
import { UpdatePetCommand } from './update-pet.command';

@CommandHandler(UpdatePetCommand)
export class UpdatePetHandler implements ICommandHandler<UpdatePetCommand> {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: UpdatePetCommand) {
    await this.repository.update(command.document, command.id, command.pet);
  }
}
