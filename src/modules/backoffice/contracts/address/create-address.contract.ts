import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Contract } from 'src/shared/contracts/contract';

import { Flunt } from 'src/utils/flunt';

@Injectable()
export class CreateAddressContract implements Contract {
  errors: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();
    flunt.isFixedLen(model.zipcode, 8, 'CEP Inválido!');
    flunt.hasMinLen(model.city, 3, 'Cidade inválida');
    flunt.hasMinLen(model.country, 2, 'Pais inválido');
    flunt.hasMinLen(model.state, 2, 'Rua inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
