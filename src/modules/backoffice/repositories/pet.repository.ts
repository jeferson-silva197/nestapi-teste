import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICustomer } from '../interfaces/customer.interface';

import { Pet } from '../models/pet.model';

@Injectable()
export class PetRepository {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
  ) {}

  async create(document: string, data: Pet) {
    const options = { upsert: true, new: true };
    return await this.customerModel.findOneAndUpdate(
      { document },
      {
        $push: {
          pets: data,
        },
      },
      options,
    );
  }

  async update(document: string, id: string, data: Pet) {
    return await this.customerModel.findOneAndUpdate(
      { document, 'pets._id': id },
      {
        $set: {
          'pets.$': data,
        },
      },
    );
  }
}
