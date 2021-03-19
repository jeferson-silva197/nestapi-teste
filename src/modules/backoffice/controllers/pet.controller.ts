import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreatePetCommand } from '../commands/pets/create/create-pet.command';

import { UpdatePetCommand } from '../commands/pets/update/update-pet.command';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly service: PetService) {}

  @Post(':document')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async addPets(
    @Param('document') document: string,
    @Body() model: Pet,
  ): Promise<ResultDto> {
    try {
      const command = new CreatePetCommand(document, model);

      await this.service.create(command);
      return new ResultDto('Pet inserido com sucesso!', true, model, null);
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

  @Put(':document/:id')
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ): Promise<ResultDto> {
    try {
      const command = new UpdatePetCommand(document, id, model);
      await this.service.update(command);
      return new ResultDto('Pet alterado com sucesso!', true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar os dados do pet!',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
