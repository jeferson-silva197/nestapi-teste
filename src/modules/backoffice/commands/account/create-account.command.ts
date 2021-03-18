import { User } from '../../models/user.model';

export class CreateAccountCommand {
  constructor(public readonly user: User) {}
}
