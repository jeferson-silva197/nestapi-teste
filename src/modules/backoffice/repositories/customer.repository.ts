import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCustomerCommand } from '../commands/customer/update-customer.command';
import { QueryDto } from '../dtos/query/query.dto';

import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerRepository {
  constructor(@InjectModel('Customer') private readonly model: Model<any>) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async update(data: UpdateCustomerCommand): Promise<Customer> {
    console.log(data);
    return await this.model.findOneAndUpdate({ document: data.document }, data);
  }

  async delete(document: string): Promise<Customer> {
    return await this.model.findOneAndDelete({ document });
  }

  async findAll(): Promise<Customer[]> {
    const res = await this.model
      .find({}, 'name email document')
      .sort('name')
      .exec();
    return res;
  }

  async findByDocument(document: string): Promise<Customer> {
    const res = await this.model
      .findOne({ document }, '-name')
      .populate('user', 'username')
      .exec();
    return res;
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }
}
