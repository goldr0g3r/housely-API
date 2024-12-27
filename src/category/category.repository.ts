import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategorySchema } from './schema/category.schema';
import { dbConnection } from 'src/common/constants/mongo.constant';
import { ICreateCategory } from 'src/common/interface/category/request/ICreateCategory';
import { InjectLogger } from 'src/common/logger/logger.decorator';
import { plainToClass } from 'class-transformer';
import { CategoryResponse } from './dto/response/CategoryResponse';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(CategorySchema.name, dbConnection.category)
    private readonly categoryModel: Model<CategorySchema>,
    @InjectLogger(CategoryRepository.name) private readonly logger: Logger,
  ) {}

  async createCategory(
    category: ICreateCategory,
  ): Promise<CategoryResponse | null> {
    try {
      const newCategory = new this.categoryModel(category);
      const res = await newCategory.save();
      return await this.toCategoryResponseModel(res);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async getAllCategories(): Promise<CategoryResponse[] | null> {
    try {
      const categories = await this.categoryModel.find();
      return await Promise.all(
        categories.map(async (category) => {
          return await this.toCategoryResponseModel(category);
        }),
      );
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  private async toCategoryResponseModel(category: CategorySchema) {
    return plainToClass(CategoryResponse, category, {
      excludeExtraneousValues: true,
    });
  }
}
