import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAddressCommand } from '../commands/addresses/create-address.command';
import { FindByZipCodeQuery } from '../queries/addresses/find-by-cep.query';

@Injectable()
export class AddressService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(command: CreateAddressCommand) {
    return await this.commandBus.execute(command);
  }

  async findByZipCode(query: FindByZipCodeQuery) {
    return await this.queryBus.execute(query);
  }
}
