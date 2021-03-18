import { Injectable } from '@nestjs/common';
import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from '../../../../utils/flunt';

import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();
    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'Email inválido');
    flunt.isFixedLen(model.document, 11, 'Cpf inválido');

    /* Criar todas validacoes necessarias abaixo */
    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
