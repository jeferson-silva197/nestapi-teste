import { AggregateRoot } from '@nestjs/cqrs';

export class CreditCard extends AggregateRoot {
  constructor(
    public holder: string,
    public number: string,
    public expiration: string,
  ) {
    super();
  }
}
