import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCreditCardCommand } from '../commands/creditcards/create-credit-card.command';

@Injectable()
export class CreditCardService {
  constructor(private readonly commandBus: CommandBus) {}

  async update(command: CreateCreditCardCommand) {
    await this.commandBus.execute(command);
  }
}
