import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories/customer.repository';
import { FindByDocumentQuery } from './find-by-document.query';

@QueryHandler(FindByDocumentQuery)
export class FindbyDocumentHandler
  implements IQueryHandler<FindByDocumentQuery> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(query: FindByDocumentQuery) {
    console.log('findbyDocument handler');
    return await this.repository.findByDocument(query.document);
  }
}
