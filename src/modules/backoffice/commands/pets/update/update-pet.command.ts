import { Pet } from 'src/modules/backoffice/models/pet.model';

export class UpdatePetCommand {
  constructor(
    public readonly document: string,
    public readonly id: string,
    public readonly pet: Pet,
  ) {}
}
