import { Injectable } from '@nestjs/common';
import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { CreditCard } from '../../models/credit-card.model';

@Injectable()
export class CreditCardContract implements Contract {
  errors: any[];
  validate(model: CreditCard): boolean {
    const flunt = new Flunt();
    flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido!');
    flunt.isFixedLen(model.number, 16, 'Número do cartão inválido!');
    flunt.isFixedLen(model.expiration, 4, 'Data de expiração inválida!');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
