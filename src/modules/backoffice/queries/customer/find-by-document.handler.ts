import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories/customer.repository';
import findByDocumentQuery from './find-by-document.query';

@QueryHandler(findByDocumentQuery)
export class FindbyDocumentHandler
  implements IQueryHandler<findByDocumentQuery> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(query: findByDocumentQuery) {
    console.log('findbyDocument handler');
    return await this.repository.findByDocument(query.document);
  }
}
