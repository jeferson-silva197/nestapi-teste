import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories/customer.repository';
import { FindAllDocumentsCommand } from './get-all.query';

@QueryHandler(FindAllDocumentsCommand)
export class FindAllDocumentsHandler
  implements IQueryHandler<FindAllDocumentsCommand> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(query: FindAllDocumentsCommand) {
    return await this.repository.findAll();
  }
}
