import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeDto } from './dto/challengeDto';
import { Challenge } from './infraestructure/challenge.interface';
import { ChallengeStatusValidationPipe } from './pipe/challenge-status-validation.pipe';

@Controller('api/v1/challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async add(@Body() challengeDto: ChallengeDto): Promise<Challenge> {
    return await this.challengeService.add(challengeDto);
  }

  @Get()
  async get(@Query('playerId') _id: string): Promise<Array<Challenge>> {
    return _id
      ? await this.challengeService.getByPlayer(_id)
      : await this.challengeService.getAll();
  }

  @Put('/:challenge')
  async edit(
    @Body(ChallengeStatusValidationPipe)
    challengeDto: ChallengeDto,
    @Param('challenge') _id: string,
  ): Promise<void> {
    await this.challengeService.edit(_id, challengeDto);
  }

  @Post('/:challenge/match/')
  async addMatchResult(
    @Param('challenge') _id: string,
    @Body(ValidationPipe) result: Array<string>,
  ): Promise<Challenge> {
    return await this.challengeService.addMatchResult(_id, result);
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string): Promise<void> {
    await this.challengeService.delete(_id);
  }
}
