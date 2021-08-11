import { Document } from 'mongoose';
import { Category } from 'src/category/infrastructure/category.interface';
import { Player } from 'src/player/infrastructure/player.interface';

export interface Match extends Document {
  // Category
  category: Category;

  // Players
  players: Array<Player>;

  //
  result: Array<string>;
}
