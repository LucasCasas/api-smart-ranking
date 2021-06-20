import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlayerDto } from './dto/playerDto';
import { Player } from './infrastructure/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModule: Model<Player>,
  ) {}

  async addPlayer(playerDto: PlayerDto): Promise<Player> {
    const { email } = playerDto;
    const playerDB = await this.playerModule.findOne({ email }).exec();

    if (playerDB) {
      new BadRequestException(`Player already exists! (${email})`);
    }

    return this.add(playerDto);
  }

  async editPlayer(_id: string, playerDto: PlayerDto): Promise<void> {
    const playerDB = await this.playerModule.findOne({ _id }).exec();

    if (!playerDB) {
      throw new NotFoundException(`Player not found!`);
    } else if (playerDB.email !== playerDto.email) {
      throw new BadRequestException(`Email cannot be updated!`);
    }
    this.edit(playerDto);
  }

  async getAll(): Promise<Player[]> {
    return this.playerModule.find().exec();
  }

  async getById(_id: string): Promise<Player> {
    const player = await this.playerModule.findOne({ _id }).exec();
    if (!player) {
      throw new NotFoundException(`Player not found (${_id})`);
    }
    return player;
  }

  async deletePlayer(_id: string): Promise<any> {
    return await this.playerModule.deleteOne({ _id });
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
