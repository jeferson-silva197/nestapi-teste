import { AddressType } from '../../enums/address-type.enum';
import { Address } from '../../models/address.model';

export class CreateAddressCommand {
  constructor(
    public readonly document: string,
    public readonly address: Address,
    public readonly addressType: AddressType,
  ) {}
}
