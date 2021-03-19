import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';

import { AddressType } from '../enums/address-type.enum';

import { ResultDto } from '../../../shared/dtos/result.dto';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateAddressCommand } from '../commands/addresses/create-address.command';
import { FindByZipCodeQuery } from '../queries/addresses/find-by-cep.query';

@Controller('v1/Addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<ResultDto> {
    try {
      const command = new CreateAddressCommand(
        document,
        model,
        AddressType.Billing,
      );
      const res = await this.service.create(command);

      return new ResultDto(
        'Endereço de cobrança inserido com sucesso!',
        true,
        res,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível cadastrar os dados!',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShipping(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<ResultDto> {
    try {
      const command = new CreateAddressCommand(
        document,
        model,
        AddressType.Shipping,
      );
      const res = await this.service.create(command);

      return new ResultDto(
        'Endereço de entrega inserido com sucesso!',
        true,
        res,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível cadastrar os dados!',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('search/:zipcode')
  async search(@Param('zipcode') zipcode: string) {
    try {
      const query = new FindByZipCodeQuery(zipcode);
      const response = await this.service.findByZipCode(query);
      return new ResultDto(null, true, response.data, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível localizar o endereço!',
          false,
          null,
          [],
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
