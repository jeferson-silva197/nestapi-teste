import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'none'],
  },
  kind: {
    type: String,
  },
  brand: {
    type: String,
  },
});

export const Adress = new mongoose.Schema({
  zipcode: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: String,
  },
  complement: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});

export const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    isRequired: true,
  },
  document: {
    type: String,
    isRequired: true,
    trim: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    isRequired: true,
    trim: true,
    index: true,
    unique: true,
  },
  pets: [PetSchema],
  billingAddress: Adress,
  shippingAddress: Adress,
  card: {
    number: {
      type: String,
    },
    holder: {
      type: String,
    },
    expiration: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    isRequired: true,
  },
});
