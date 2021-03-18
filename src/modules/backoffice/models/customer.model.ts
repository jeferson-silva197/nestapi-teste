import { AggregateRoot } from '@nestjs/cqrs';
import { Address } from './address.model';
import { CreditCard } from './credit-card.model';

import { Pet } from './pet.model';
import { User } from './user.model';

export class Customer extends AggregateRoot {
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public pets: Pet[],
    public billingAddress: Address,
    public shippingAdress: Address,
    public creditCard: CreditCard,
    public user: User,
  ) {
    super();
  }

  create() {
    // Regras de negócio
    //this.apply(new UserCreatedEvent(this.username));
  }
}
