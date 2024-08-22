import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('posts')
@Auth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':categoriaID')
  create(
    @GetUser() user: User,
    @Param('categoriaID') categoriaID: string,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postsService.create(user, categoriaID, createPostDto);
  };

  @Get()
  findAll() {
    return this.postsService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  };

  @Get('category/:categoryID')
  findByCategory(@Param('categoryID') categoryID: string) {
    return this.postsService.findByCategory(categoryID);
  };

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string, 
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(id, user, updatePostDto);
  };

  @Delete(':id')
  remove(
    @GetUser() user: User,
    @Param('id')
     id: string
    ) {
    return this.postsService.remove(id, user);
  }
}
