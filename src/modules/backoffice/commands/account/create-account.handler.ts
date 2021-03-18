import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Md5 } from 'md5-typescript';
import { User } from 'src/modules/backoffice/models/user.model';
import { AccountRepository } from 'src/modules/backoffice/repositories/account.repository';
import { environment } from 'src/shared/common/enviropnment';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateAccountCommand): Promise<User> {
    console.log('CommandHandler: Funcao conexao com repository iniciada...');
    let user = await this.repository.findbyEmail(command.email);
    if (!user) {
      command.password = Md5.init(
        `${command.password}${environment.security.salt_key}`,
      );
      const res = await this.repository.create(
        new User(
          null,
          command.username,
          command.email,
          command.roles,
          command.password,
          true,
        ),
      );

      user = this.publisher.mergeObjectContext(
        new User(
          res.id,
          res.username,
          res.email,
          res.roles,
          res.password,
          res.active,
        ),
      );
      user.create();
      return res;
    }

    throw new HttpException(
      'Verifique os dados, esse e-mail já tem cadastro ativo!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
