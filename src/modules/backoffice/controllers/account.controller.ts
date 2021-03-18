import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AuthenticateCommand } from '../commands/account/authenticate.command';
import { ChangePasswordCommand } from '../commands/account/change-password.command';
import { RefreshTokenCommand } from '../commands/account/refresh-token.command';
import { ResetPasswordCommand } from '../commands/account/reset-password.command';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { AccountService } from '../services/account.service';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<ResultDto> {
    const token = await this.accountService.authenticate(
      new AuthenticateCommand(model.username, model.password),
    );

    return new ResultDto(null, true, token, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      const command = new ResetPasswordCommand(model.document);
      await this.accountService.resetPassword(command);
      return new ResultDto(
        'Uma nova senha foi enviada para seu E-mail!',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível enviar os dados para seu e-mail!',
          false,
          null,
          null,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() request: any,
    @Body() model: ChangePasswordDto,
  ): Promise<ResultDto> {
    try {
      const res = await this.accountService.changePassword(
        new ChangePasswordCommand(
          request.user.document,
          model.password,
          model.newPassword,
        ),
      );
      return new ResultDto(
        'Sua senha foi alterada com sucesso!',
        true,
        { id: res._id },
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto('Não foi possível alterar a senha!', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request: any): Promise<ResultDto> {
    /*verificar no bd os dados */
    const command = new RefreshTokenCommand(
      request.user.document,
      request.user.email,
      request.user.roles,
    );

    const token = await this.accountService.refreshToken(command);

    return new ResultDto(
      'Token de acesso atualizado com sucesso!',
      false,
      token,
      null,
    );
  }
}
