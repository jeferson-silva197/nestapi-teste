import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class AccountService {
  constructor(private readonly commandBus: CommandBus) {}
}
