import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class VotesService {

  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private postsService: PostsService,
  ) {};  

  async create(createVoteDto: CreateVoteDto, user: User, postId: string) {
    const post = await this.postsService.findOne(postId);
    if (!post) throw new BadRequestException('Post not found');

    const existingVote = await this.voteRepository.findOne({
      where: { user: { id: user.id }, post: { id: postId } },
    });
    if (existingVote) throw new BadRequestException('You have already voted on this post');

    const vote = this.voteRepository.create({...createVoteDto, user, post});
    return this.voteRepository.save(vote);
  };

  async findAll(postId: string) {
    const post = await this.postsService.findOne(postId);
    if (!post) throw new BadRequestException('Post not found');
    return this.voteRepository.find({where: {post}});
    
  };

  async findOne(id: string) {
    const vote = await this.voteRepository.findOneBy({id});
    if (!vote) throw new BadRequestException('Vote not found');
    return vote;
   
  };

  async update(voteId:string, user:User, updateVoteDto: UpdateVoteDto) {
    const vote = await this.findOne(voteId);
    if (!vote) throw new BadRequestException('Vote not found');
    if (vote.user.id !== user.id) throw new BadRequestException('You are not the owner of this vote');
    await this.voteRepository.update(voteId, updateVoteDto);
    return;
  };

  async remove(id: string, user: User) {
    const vote = await this.findOne(id);
    if (!vote) throw new BadRequestException('Vote not found');
    if (vote.user.id !== user.id) throw new BadRequestException('You are not the owner of this vote');
    const deleteVote = await this.voteRepository.delete(id);
    if (deleteVote.affected === 0) throw new BadRequestException('Vote not found');
    return;
   
  };
}
