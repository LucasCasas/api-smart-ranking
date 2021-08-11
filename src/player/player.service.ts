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
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async add(playerDto: PlayerDto): Promise<Player> {
    const { email } = playerDto;
    const playerDB = await this.playerModel.findOne({ email }).exec();

    if (playerDB) {
      new BadRequestException(`Player already exists! (${email})`);
    }

    const newPlayer = new this.playerModel(playerDto);
    return newPlayer.save();
  }

  async edit(_id: string, playerDto: PlayerDto): Promise<Player> {
    const playerDB = await this.playerModel.findOne({ _id }).exec();

    if (!playerDB) {
      throw new NotFoundException(`Player not found!`);
    } else if (playerDB.email !== playerDto.email) {
      throw new BadRequestException(`Email cannot be updated!`);
    }
    return await this.playerModel
      .findOneAndUpdate({ email: playerDto.email }, { $set: playerDto })
      .exec();
  }

  async getAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async getById(_id: string): Promise<Player> {
    console.log(_id);
    const player = await this.playerModel.findOne({ _id }).exec();
    if (!player) {
      throw new NotFoundException(`Player not found (${_id})`);
    }
    return player;
  }

  async delete(_id: string): Promise<any> {
    return await this.playerModel.deleteOne({ _id });
  }
}
