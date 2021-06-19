import { Document } from 'mongoose';

export interface Player extends Document {
  // Player phone number
  readonly phoneNumber: string;

  // Player email
  readonly email: string;

  // Player name
  name: string;

  // Ranking name
  ranking: string;

  // Ranking position
  rankingPosition: number;

  // Player photo url
  photoUrl: string;
}
