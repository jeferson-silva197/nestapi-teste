import { Pet } from 'src/modules/backoffice/models/pet.model';
import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from 'src/utils/flunt';

export class CreatePetContract implements Contract {
  errors: any[];

  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 3, 'Nome inválido');
    flunt.hasMinLen(model.gender, 3, 'Gênero inválido');
    flunt.hasMinLen(model.brand, 3, 'Raça inválido');
    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
