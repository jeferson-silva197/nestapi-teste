import { User } from 'src/modules/backoffice/models/user.model';

export class CreateCustomerCommand {
  constructor(
    public name: string,
    public email: string,
    public document: string,
    public user: User,
  ) {}
}
