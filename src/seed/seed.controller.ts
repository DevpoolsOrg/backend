import { Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get('loginAndVote')
  async loginAndVote() {
    return await this.seedService.loginAndVote();
  };

  @Get()
  async seed() {
    return await this.seedService.seed();
  }


 
};
