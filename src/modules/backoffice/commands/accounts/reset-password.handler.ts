import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Md5 } from 'md5-typescript';
import { environment } from 'src/shared/common/enviropnment';
import { AccountRepository } from '../../repositories/account.repository';
import { ResetPasswordCommand } from './reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand> {
  constructor(private readonly repository: AccountRepository) {}
  async execute(command: ResetPasswordCommand): Promise<any> {
    //Lib para gerar nova senha!
    const password = Md5.init(`${'112233'}${environment.security.salt_key}`);

    return await this.repository.update(command.document, {
      password: password,
    });
  }
}
