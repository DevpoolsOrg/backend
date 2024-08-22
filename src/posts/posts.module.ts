import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from './entities/post.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    CategoriesModule
  ],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
