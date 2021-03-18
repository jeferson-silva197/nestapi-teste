import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import findByDocumentQuery from '../../queries/customer/find-by-document.query';

@Injectable()
export class CustomerQueryService {
  constructor(private readonly queryBus: QueryBus) {}

  async findbyDocument(getCustomerQuery: findByDocumentQuery) {
    return await this.queryBus.execute(getCustomerQuery);
  }
}
