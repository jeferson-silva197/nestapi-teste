import { AggregateRoot } from '@nestjs/cqrs';

export class Pet extends AggregateRoot {
  constructor(
    public name: string,
    public gender: string,
    public kind: string,
    public brand: string,
  ) {
    super();
  }
}
