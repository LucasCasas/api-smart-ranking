import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date,
    },
    status: {
      type: Number,
    },
    dateTimeRequest: {
      type: Date,
    },
    dateTimeResponse: {
      type: Date,
    },
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  },
  { timestamps: true, collection: 'challenge' },
);
