import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AccountRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async create(data: User): Promise<User> {
    const user = new this.userModel(data);
    return await user.save();
  }

  async findbyEmail(email: string): Promise<User> {
    const res = await this.userModel.findOne({ email }).exec();
    return res;
  }

  async update(username: string, data: any): Promise<User> {
    return await this.userModel.findOneAndUpdate({ username }, data);
  }

  /* async authenticate(username: string, password: string): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({
        document: username,
      })
      .populate('user')
      .exec();

    const pass = Md5.init(`${password}${environment.security.salt_key}`);
    if (pass.toString() == customer.user.password.toString()) {
      return customer;
    } else {
      return null;
    }
  }*/
}
