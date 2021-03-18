import { CreateAccountHandler } from './account/create-account.handler';
import { CreateCustomerHandler } from './customer/create-customer.handler';
import { DeleteCustomerHandler } from './customer/delete-customer.handler';
import { UpdateCustomerHandler } from './customer/update-customer.handler';

export const CommandHandlers = [
  CreateAccountHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];
