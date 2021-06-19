import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from './dto/playerDto';
import { Player } from './infrastructure/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModule: Model<Player>,
  ) {}

  async addEditPlayer(playerDto: PlayerDto): Promise<void> {
    const { email } = playerDto;
    const playerDB = await this.playerModule.findOne({ email }).exec();

    if (playerDB) {
      this.edit(playerDto);
    } else {
      this.add(playerDto);
    }
  }

  async getAll(): Promise<Player[]> {
    return this.playerModule.find().exec();
  }

  async getByEmail(email: string): Promise<Player> {
    const player = await this.playerModule.findOne({ email }).exec();
    if (!player) {
      throw new NotFoundException(`Player not found (${email})`);
    }
    return player;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModule.deleteOne({ email });
  }

  private async add(playerDto: PlayerDto): Promise<Player> {
    const newPlayer = new this.playerModule(playerDto);
    return newPlayer.save();
  }

  private async edit(playerDto: PlayerDto): Promise<Player> {
    return await this.playerModule
      .findOneAndUpdate({ email: playerDto.email }, { $set: playerDto })
      .exec();
  }
}
