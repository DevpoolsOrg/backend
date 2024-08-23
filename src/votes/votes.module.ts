import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [VotesController],
  imports: [
    TypeOrmModule.forFeature([Vote]),
    PostsModule,
  ],
  providers: [VotesService],
  exports: [VotesService],
})
export class VotesModule {}
