import { Address } from '../../models/address.model';
import { CreditCard } from '../../models/credit-card.model';
import { Pet } from '../../models/pet.model';
import { User } from '../../models/user.model';

export class GetCustomerDto {
  constructor(
    public name: string,
    public readonly document: string,
    public readonly email: string,
    public readonly pets: Pet[],
    public readonly billingAddress: Address,
    public readonly shippingAdress: Address,
    public readonly creditCard: CreditCard,
    public readonly user: User,
  ) {}
}
