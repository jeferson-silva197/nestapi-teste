import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthenticateCommand } from '../commands/accounts/authenticate.command';
import { ChangePasswordCommand } from '../commands/accounts/change-password.command';
import { RefreshTokenCommand } from '../commands/accounts/refresh-token.command';
import { ResetPasswordCommand } from '../commands/accounts/reset-password.command';

@Injectable()
export class AccountService {
  constructor(private readonly commandBus: CommandBus) {}

  async authenticate(command: AuthenticateCommand) {
    return await this.commandBus.execute(command);
  }

  async resetPassword(command: ResetPasswordCommand) {
    return this.commandBus.execute(command);
  }

  async changePassword(command: ChangePasswordCommand) {
    return this.commandBus.execute(command);
  }
  async refreshToken(command: RefreshTokenCommand) {
    return this.commandBus.execute(command);
  }
}
