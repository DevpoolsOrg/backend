import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersData } from './data/data';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    private readonly userServices: UsersService,
    private readonly configService: ConfigService
  ) {}

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
 

}
