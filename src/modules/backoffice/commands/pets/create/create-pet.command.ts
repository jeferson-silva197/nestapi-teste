import { Pet } from 'src/modules/backoffice/models/pet.model';

export class CreatePetCommand {
  constructor(public readonly document: string, public readonly pet: Pet) {}
}
