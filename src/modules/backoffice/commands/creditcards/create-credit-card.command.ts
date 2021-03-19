import { CreditCard } from '../../models/credit-card.model';

export class CreateCreditCardCommand {
  constructor(public document: string, public card: CreditCard) {}
}
