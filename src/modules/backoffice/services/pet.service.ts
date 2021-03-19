import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePetCommand } from '../commands/pets/create/create-pet.command';

import { UpdatePetCommand } from '../commands/pets/update/update-pet.command';

@Injectable()
export class PetService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(command: CreatePetCommand) {
    return this.commandBus.execute(command);
  }

  async update(command: UpdatePetCommand) {
    return this.commandBus.execute(command);
  }
}
