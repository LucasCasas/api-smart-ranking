import { Document } from 'mongoose';
import { ChallengeStatusEnum } from 'src/common/enum/ChallengeStatusEnum';
import { Player } from 'src/player/infrastructure/player.interface';
import { Match } from './match.interface';

export interface Challenge extends Document {
  // When the challenge will happen
  dateTime: Date;

  // Challenge status
  status: ChallengeStatusEnum;

  // When the challenge was requested
  dateTimeRequest: Date;

  // When was answered
  dateTimeResponse: Date;

  // Who requested
  challenger: Player;

  // Match
  match: Match;
}

// export interface MatchResult extends Document {
//     set: string;
// }
