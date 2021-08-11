import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { ChallengeStatusEnum } from 'src/common/enum/ChallengeStatusEnum';
import { PlayerService } from 'src/player/player.service';
import { ChallengeDto } from './dto/challengeDto';
import { Challenge } from './infraestructure/challenge.interface';
import { Match } from './infraestructure/match.interface';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly playerService: PlayerService,
    private readonly categoryService: CategoryService,
  ) {}

  async add(challengeDto: ChallengeDto): Promise<Challenge> {
    for (const matchPlayer of challengeDto.match.players) {
      // If not found will throw an exception
      await this.playerService.getById(matchPlayer.id);
    }

    const isMatchPlayer = await challengeDto.match.players.filter(
      (player) => player._id == challengeDto.challenger,
    );

    if (isMatchPlayer.length == 0) {
      throw new BadRequestException(
        `The challenger must be a player on this match!`,
      );
    }

    const playerCategory = await this.categoryService.getByPlayer(
      challengeDto.challenger,
    );

    if (!playerCategory) {
      throw new BadRequestException(
        `The challenger don\'t belong to any category!`,
      );
    }

    let newChallenge = new this.challengeModel(challengeDto);
    newChallenge.dateTimeRequest = new Date();
    newChallenge.dateTime = challengeDto.dateTime;
    newChallenge.status = ChallengeStatusEnum.Pending;

    let newMatch = new this.matchModel(challengeDto.match);
    newMatch.players = challengeDto.match.players;
    newMatch.category = playerCategory;

    newChallenge.match = newMatch;

    return await newChallenge.save();
  }

  async getById(_id: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findOne({ _id }).exec();
    if (!challenge) {
      throw new NotFoundException(`Challenge not found (${_id})`);
    }
    return challenge;
  }

  async getAll(): Promise<Array<Challenge>> {
    return await this.challengeModel
      .find()
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec();
  }

  async getByPlayer(_id: any): Promise<Array<Challenge>> {
    // If doesn't exists will throw an exception
    await this.playerService.getById(_id);

    return await this.challengeModel
      .find()
      .where('players')
      .in(_id)
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec();
  }

  async edit(_id: string, challengeDto: ChallengeDto): Promise<void> {
    const challengeDb = await this.getById(_id);

    if (challengeDto.status) {
      challengeDb.dateTimeResponse = new Date();
    }
    challengeDb.status = challengeDto.status;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeDb })
      .exec();
  }

  async addMatchResult(_id, result): Promise<Challenge> {
    const challengeDb = await this.getById(_id);

    challengeDb.status = ChallengeStatusEnum.Performed;
    challengeDb.match.result = result;

    return await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeDb })
      .exec();
  }

  async delete(_id: string): Promise<void> {
    const challengeDb = await this.getById(_id);
    challengeDb.status = ChallengeStatusEnum.Cancelled;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeDb })
      .exec();
  }
}
