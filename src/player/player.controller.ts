import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayerDto } from './dto/playerDto';
import { Player } from './infrastructure/player.interface';
import { PlayerParameterValidatorPipe } from './pipe/player-parameter-validator.pipe';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async add(@Body() playerDto: PlayerDto): Promise<Player> {
    return await this.playerService.add(playerDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async edit(
    @Body() playerDto: PlayerDto,
    @Param('id', PlayerParameterValidatorPipe) id: string,
  ): Promise<Player> {
    return await this.playerService.edit(id, playerDto);
  }

  @Get('/:id')
  async get(
    @Param('id', PlayerParameterValidatorPipe) id: string,
  ): Promise<Player> {
    return await this.playerService.getById(id);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return await this.playerService.getAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.playerService.delete(id);
  }
}
