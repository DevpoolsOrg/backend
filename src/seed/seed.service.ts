import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersData } from './data/data';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { VotesService } from 'src/votes/votes.service';
import { ValidVotes } from 'src/common/constans/ValidVotes';
import { CreateVoteDto } from 'src/votes/dto/create-vote.dto';


@Injectable()
export class SeedService {
  constructor(
    private readonly userServices: UsersService,
    private readonly configService: ConfigService,
    private readonly postServices: PostsService,
    private readonly voteServices: VotesService,
    private readonly authServices: AuthService
  ) { }

  async seed() {
    if (this.configService.get('ENVIROMENT') !== 'development') {
      throw new InternalServerErrorException('This endpoint is only available in development mode');
    }
    // await this.deleteTables();
    await this.insertUsers();
  };

  private async insertUsers() {
    const seedUsers = UsersData;

    const insertPromises = seedUsers.map(async (user) => {
      return await this.userServices.create(user);
    });

    await Promise.all(insertPromises);
    return insertPromises[0];
  }
  private async deleteTables() {
    try {
      await this.userServices.deleteAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  async loginAndVote() {
    console.log('entro a loginAndVote');
    const validVotesArray = ['de acuerdo', 'poco de acuerdo'];
    const randomUser = Math.floor(Math.random() * UsersData.length);
    const user = UsersData[randomUser];
    const loginUser = await this.authServices.login(user);
    const post = await this.postServices.findAll();
    const randomPost = Math.floor(Math.random() * post.length);
    const selectedPost = post[randomPost];
    const randomVote = Math.floor(Math.random() * validVotesArray.length); 
    const voteOption = validVotesArray[randomVote] ;
    const createVote: CreateVoteDto={
      voteOption: voteOption
    }
    const vote = await this.voteServices.create( createVote  , loginUser.user, selectedPost.id)
    return vote;
  }

 

}
