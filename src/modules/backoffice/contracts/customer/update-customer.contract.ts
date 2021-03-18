import { Injectable } from '@nestjs/common';
import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
  errors: any[];
  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();
    flunt.hasMinLen(model.name, 3, 'Nome inválido!');
    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
