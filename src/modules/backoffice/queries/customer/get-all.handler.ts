import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories/customer.repository';
import { FindAllDocumentsQuery } from './get-all.query';

@QueryHandler(FindAllDocumentsQuery)
export class FindAllDocumentsHandler
  implements IQueryHandler<FindAllDocumentsQuery> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(query: FindAllDocumentsQuery) {
    return await this.repository.findAll();
  }
}
