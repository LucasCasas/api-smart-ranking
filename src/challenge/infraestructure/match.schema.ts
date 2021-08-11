import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    result: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, collection: 'match' },
);
