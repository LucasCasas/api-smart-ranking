import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Player } from 'src/player/infrastructure/player.interface';
import { Event } from '../infrastructure/event.interface';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  events: Array<Event>;
}
