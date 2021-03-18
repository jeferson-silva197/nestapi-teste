import { Injectable } from '@nestjs/common';
import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { CreateAccountDto } from '../../dtos/account/create-account.dto';

@Injectable()
export class CreateAccountContract implements Contract {
  errors: any[];
  validate(model: CreateAccountDto): boolean {
    const flunt = new Flunt();
    flunt.isEmail(model.email, 'Email inválido!');
    flunt.isFixedLen(model.document, 11, 'Documento inválido!');
    flunt.hasMinLen(model.username, 3, 'username muito curto!');
    flunt.hasMinLen(model.password, 6, 'Password muito fraco!');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
