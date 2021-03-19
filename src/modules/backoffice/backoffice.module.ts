import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'src/shared/common/enviropnment';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt-strategy';
import { CommandHandlers } from './commands';
import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CreditCardController } from './controllers/credit-card.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';
import { EventHandlers } from './events';

import { QueryHandlers } from './queries';
import { Repositories } from './repositories';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { Services } from './services';

@Module({
  imports: [
    CqrsModule,
    CacheModule.register({ ttl: 600 }),
    HttpModule,

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
  controllers: [
    AccountController,
    AddressController,
    CreditCardController,
    CustomerController,
    PetController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ...CommandHandlers,
    ...EventHandlers,
    ...Repositories,
    ...Services,
    ...QueryHandlers,
  ],
})
export class BackofficeModule {}
