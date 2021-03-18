import { CreateAccountHandler } from './account/create-account.handler';
import { CreateCustomerHandler } from './customer/create-customer.handler';

export const CommandHandlers = [CreateAccountHandler, CreateCustomerHandler];
