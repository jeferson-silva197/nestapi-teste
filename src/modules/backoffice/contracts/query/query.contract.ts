import { Contract } from 'src/shared/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { QueryDto } from '../../dtos/query/query.dto';

export class QueryContract implements Contract {
  errors: any[];
  validate(model: QueryDto): boolean {
    const flunt = new Flunt();
    if (!model.query) model.query = {};

    flunt.hasMaxValue(
      model.take,
      30,
      'Não é possível obter mais que 30 registros por resposta',
    );
    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
