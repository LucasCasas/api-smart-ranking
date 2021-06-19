import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PlayerDto } from './dto/playerDto';
import { Player } from './infrastructure/player.interface';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async addEditPlayer(@Body() playerDto: PlayerDto) {
    return await this.playerService.addEditPlayer(playerDto);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return await this.playerService.getByEmail(email);
    }

    return await this.playerService.getAll();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playerService.deletePlayer(email);
  }
}
