import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { ICreateCategory } from 'src/common/interface/category/request/ICreateCategory';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: ICreateCategory) {
    return await this.categoryRepository.createCategory(category);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }
}
