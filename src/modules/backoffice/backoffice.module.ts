import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'src/shared/common/enviropnment';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt-strategy';
import { CommandHandlers } from './commands';
import { CustomerController } from './controllers/customer.controller';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries';
import { AccountRepository } from './repositories/account.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account/account.service';
import { CustomerCommandService } from './services/customer/customer-command.service';
import { CustomerQueryService } from './services/customer/customer-query.service';

@Module({
  imports: [
    CqrsModule,

    MongooseModule.forRoot('mongodb://localhost/loto-nest', {
      useCreateIndex: true,
      useNewUrlParser: true,
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
  controllers: [CustomerController],
  providers: [
    AccountService,
    AccountRepository,
    CustomerQueryService,
    CustomerCommandService,
    CustomerRepository,
    AuthService,
    JwtStrategy,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class BackofficeModule {}
