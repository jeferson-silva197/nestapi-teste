import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreditCardRepository } from '../../repositories/credit-card.repository';
import { CreateCreditCardCommand } from './create-credit-card.command';

@CommandHandler(CreateCreditCardCommand)
export class CreateCreditCardHandler
  implements ICommandHandler<CreateCreditCardCommand> {
  constructor(private readonly repository: CreditCardRepository) {}
  async execute(command: CreateCreditCardCommand): Promise<any> {
    return await this.repository.update(command.document, command.card);
  }
}
