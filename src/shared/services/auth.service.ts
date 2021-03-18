import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(document: string, email: string, roles: string[]) {
    const payload: JwtPayload = {
      document: document,
      email: email,
      roles: roles,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload;
    // return await this.accountService.findOneByUsername(payload.document); caso necessite validar sempre no banco
  }
}
