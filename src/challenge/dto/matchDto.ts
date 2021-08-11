import { IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Player } from 'src/player/infrastructure/player.interface';

export class MatchDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<Player>;
}
