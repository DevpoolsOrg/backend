import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
@Auth()
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post(':postId')
  create(
    @Body() createVoteDto: CreateVoteDto,
    @GetUser() user: User,
    @Param('postId') postId: string,
  ) {
    return this.votesService.create(createVoteDto, user, postId);
  };

  @Get(':postId')
  findAll(
    @Param('postId') postId: string,
  ) {
    return this.votesService.findAll(postId);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  };

  @Patch(':voteId/')
  update(
    @GetUser() user: User,
    @Param('voteId') voteId: string, 
    @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(voteId, user, updateVoteDto);
    
  };

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.votesService.remove(id, user);
  };
};
