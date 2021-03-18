import { IQuery } from '@nestjs/cqrs';

export class FindByDocumentQuery implements IQuery {
  constructor(public readonly document: string) {}
}
