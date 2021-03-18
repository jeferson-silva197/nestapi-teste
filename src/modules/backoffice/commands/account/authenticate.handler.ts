import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Md5 } from 'md5-typescript';
import { environment } from 'src/shared/common/enviropnment';
import { AuthService } from 'src/shared/services/auth.service';
import { AccountRepository } from '../../repositories/account.repository';
import { AuthenticateCommand } from './authenticate.command';

@CommandHandler(AuthenticateCommand)
export class AuthenticateHandler
  implements ICommandHandler<AuthenticateCommand> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authService: AuthService,
  ) {}
  async execute(command: AuthenticateCommand): Promise<any> {
    const encryptedPass = Md5.init(
      `${command.password}${environment.security.salt_key}`,
    );

    const customer = await this.accountRepository.authenticate(
      command.username,
      encryptedPass,
    );
    if (!customer) {
      return;
    }
    if (!customer.user.active) {
      throw new Error('Usuário inativo!');
    }
    // Gera Token
    const token = await this.authService.createToken(
      customer.document,
      customer.email,
      customer.user.roles,
    );
    return token;
  }
}
