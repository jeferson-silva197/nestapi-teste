import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AddressRepository } from '../../repositories/address.repository';
import { FindByZipCodeQuery } from './find-by-cep.query';

@QueryHandler(FindByZipCodeQuery)
export class FindByZipCodeHandler implements IQueryHandler<FindByZipCodeQuery> {
  constructor(private readonly repository: AddressRepository) {}
  async execute(query: FindByZipCodeQuery): Promise<any> {
    return await this.repository.getAddressByZipCode(query.zipcode).toPromise();
  }
}
