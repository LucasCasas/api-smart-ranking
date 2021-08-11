import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ChallengeStatusEnum } from 'src/common/enum/ChallengeStatusEnum';
import { Player } from 'src/player/infrastructure/player.interface';
import { MatchDto } from './matchDto';

export class ChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateTime: Date;

  @IsNotEmpty()
  challenger: Player;

  @IsOptional()
  status: ChallengeStatusEnum;

  @IsNotEmpty()
  match: MatchDto;
}
