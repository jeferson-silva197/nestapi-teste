import { AuthenticateHandler } from './account/authenticate.handler';
import { ChangePasswordHandler } from './account/change-password.handler';
import { CreateAccountHandler } from './account/create-account.handler';
import { RefreshTokenHandler } from './account/refresh-token.handler';
import { ResetPasswordHandler } from './account/reset-password.handler';
import { CreateCustomerHandler } from './customer/create-customer.handler';
import { DeleteCustomerHandler } from './customer/delete-customer.handler';
import { UpdateCustomerHandler } from './customer/update-customer.handler';

export const CommandHandlers = [
  AuthenticateHandler,
  ResetPasswordHandler,
  ChangePasswordHandler,
  RefreshTokenHandler,
  CreateAccountHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];
