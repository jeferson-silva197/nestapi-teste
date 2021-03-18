import { Document } from 'mongoose';
import { CreditCard } from '../models/credit-card.model';
import { Pet } from '../models/pet.model';
import { User } from '../models/user.model';

export interface ICustomer extends Document<any> {
  name: string;
  document: string;
  email: string;
  pets: Pet[];
  billingAddress: any;
  shippingAdress: any;
  creditCard: CreditCard;
  user: User;
}
