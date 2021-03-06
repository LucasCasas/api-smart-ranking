import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dev:oI8T1rY5QAnTmkTI@cluster0.iygld.mongodb.net/smartRanking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    ConfigModule.forRoot(),
    PlayerModule,
    CategoryModule,
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
