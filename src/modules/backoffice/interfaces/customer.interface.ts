import { Document } from 'mongoose';
import { Pet } from '../models/pet.model';

export interface ICustomer extends Document {
  pets: Pet[];
  billingAddress: any;
  shippingAdress: any;
}
