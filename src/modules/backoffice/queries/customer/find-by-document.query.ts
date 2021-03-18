import { IQuery } from '@nestjs/cqrs';

export default class findByDocumentQuery implements IQuery {
  constructor(public readonly document: string) {}
}
