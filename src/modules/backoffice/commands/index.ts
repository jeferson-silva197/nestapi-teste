import { AuthenticateHandler } from './accounts/authenticate.handler';
import { ChangePasswordHandler } from './accounts/change-password.handler';
import { CreateAccountHandler } from './accounts/create-account.handler';
import { RefreshTokenHandler } from './accounts/refresh-token.handler';
import { ResetPasswordHandler } from './accounts/reset-password.handler';
import { CreateAddressHandler } from './addresses/create-address.handler';
import { CreateCreditCardHandler } from './creditcards/create-credit-card.handler';
import { CreateCustomerHandler } from './customers/create/create-customer.handler';
import { DeleteCustomerHandler } from './customers/delete/delete-customer.handler';
import { UpdateCustomerHandler } from './customers/update/update-customer.handler';
import { CreatePetHandler } from './pets/create/create-pet.handler';

import { UpdatePetHandler } from './pets/update/update-pet.handler';

export const CommandHandlers = [
  AuthenticateHandler,
  ResetPasswordHandler,
  ChangePasswordHandler,
  RefreshTokenHandler,
  CreateAccountHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
  CreateCreditCardHandler,
  CreatePetHandler,
  UpdatePetHandler,
  CreateAddressHandler,
];
