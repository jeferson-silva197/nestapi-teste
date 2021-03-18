import { AggregateRoot } from '@nestjs/cqrs';
export class User extends AggregateRoot {
  constructor(
    public id: string,
    public username: string,
    public roles: string[],
    public password: string,
    public active: boolean,
  ) {
    super();
  }

  create() {
    // Regras de negócio
    //this.apply(new UserCreatedEvent(this.username));
  }
}
