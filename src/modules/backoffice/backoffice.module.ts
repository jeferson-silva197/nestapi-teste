import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'src/shared/common/enviropnment';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt-strategy';
import { CommandHandlers } from './commands';
import { AccountController } from './controllers/account.controller';
import { CustomerController } from './controllers/customer.controller';
import { EventHandlers } from './events';

import { QueryHandlers } from './queries';
import { AccountRepository } from './repositories/account.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [
    CqrsModule,

    MongooseModule.forRoot('mongodb://localhost/loto-nest', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'User', schema: UserSchema },
    ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: environment.security.jwtSecretKey,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AccountController, CustomerController],
  providers: [
    AccountService,
    AccountRepository,
    AccountController,
    CustomerService,
    CustomerRepository,
    AuthService,
    JwtStrategy,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class BackofficeModule {}
