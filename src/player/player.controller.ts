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
  async addPlayer(@Body() playerDto: PlayerDto): Promise<Player> {
    return await this.playerService.addPlayer(playerDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async editPlayer(
    @Body() playerDto: PlayerDto,
    @Param('id', PlayerParameterValidatorPipe) id: string,
  ): Promise<void> {
    return await this.playerService.editPlayer(id, playerDto);
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
  async deletePlayer(@Param('id') id: string): Promise<void> {
    this.playerService.deletePlayer(id);
  }
}
