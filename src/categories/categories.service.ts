import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>

  ) {
  };

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  };

  async findAll() {
    return await this.categoryRepository.find();
  };

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  };

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepository.update(id, updateCategoryDto);
    if (updatedCategory.affected === 0) {
      throw new NotFoundException('Category not found');
    };
  };

  async remove(id: string) {
    const DeletedCategory = await this.categoryRepository.delete(id);
    if (DeletedCategory.affected === 0) {
      throw new NotFoundException('Category not found');
    };
  };
};
