import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { ValidRoles } from 'src/auth/interfaces';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private categoryService: CategoriesService,
  ) {};
  async create(user:User, categoriaID: string, createPostDto: CreatePostDto): Promise<Post> {
    const category = await this.categoryService.findOne(categoriaID);
    if (!category) throw new BadRequestException('Categori not found');
    const post = this.postRepository.create({...createPostDto, user, category});
    return this.postRepository.save(post);
  };

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  };

  async findOne(id: string): Promise<Post > {
    const post = await this.postRepository.findOneBy({id});
    if (!post) throw new BadRequestException('Post not found');
    return post;
  };

  async findByCategory(categoryID: string): Promise<Post[]> {
    const category = await this.categoryService.findOne(categoryID);
    if (!category) throw new BadRequestException('Category not found');
    const post = await this.postRepository.find({where: {category}});
    if (!post) throw new BadRequestException('Posts not found');
    return post;
    
  };

  async update(id: string, user:User,  updatePostDto: UpdatePostDto): Promise<void> {
    const post = await this.findOne(id);
    if (!post) throw new BadRequestException('Post not found');
    if (post.user.id !== user.id) throw new BadRequestException('You are not the owner of this post');
    await this.postRepository.update(id, updatePostDto);
    return;
  };

  async remove(id: string, user:User): Promise<void> {
    const post = await this.findOne(id);
    if (!post) throw new BadRequestException('Post not found');
    if (post.user.id !== user.id && user.roles.includes(ValidRoles.ADMIN)) throw new BadRequestException('You are not the owner of this post');
    const update = await this.postRepository.update(id, {isPublished: false});
    if (update.affected === 0) throw new BadRequestException('Post not found');
    return;
  };
};
