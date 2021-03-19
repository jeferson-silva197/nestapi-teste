import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressType } from '../enums/address-type.enum';
import { ICustomer } from '../interfaces/customer.interface';
import { Address } from '../models/address.model';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
    private readonly httpService: HttpService,
  ) {}

  async create(
    document: string,
    data: Address,
    type: AddressType,
  ): Promise<any> {
    const options = { upsert: true };

    if (type == AddressType.Billing) {
      return await this.customerModel.findOneAndUpdate(
        { document },
        { $set: { billingAddress: data } },
        options,
      );
    } else {
      return await this.customerModel.findOneAndUpdate(
        { document },
        { $set: { shippingAddress: data } },
        options,
      );
    }
  }

  getAddressByZipCode(zipcode: string) {
    const url = `https://viacep.com.br/ws/${zipcode}/json`;
    return this.httpService.get(url);
  }
}
