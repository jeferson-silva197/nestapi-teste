import { AggregateRoot } from '@nestjs/cqrs';

export class Address extends AggregateRoot {
  constructor(
    public zipcode: string,
    public street: string,
    public number: string,
    public complement: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public country: string,
  ) {
    super();
  }
}
