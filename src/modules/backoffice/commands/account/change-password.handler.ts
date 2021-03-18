import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Md5 } from 'md5-typescript';
import { environment } from 'src/shared/common/enviropnment';
import { AccountRepository } from '../../repositories/account.repository';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand> {
  constructor(public repository: AccountRepository) {}
  async execute(command: ChangePasswordCommand): Promise<any> {
    command.newPassword = Md5.init(
      `${command.password}${environment.security.salt_key}`,
    );
    return await this.repository.update(command.document, {
      password: command.newPassword,
    });
  }
}
