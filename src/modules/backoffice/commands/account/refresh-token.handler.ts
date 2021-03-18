import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/shared/services/auth.service';
import { RefreshTokenCommand } from './refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand> {
  constructor(private service: AuthService) {}
  async execute(command: RefreshTokenCommand): Promise<any> {
    const token = await this.service.createToken(
      command.document,
      command.email,
      command.roles,
    );
    return token;
  }
}
