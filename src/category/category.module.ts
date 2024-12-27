import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, CategorySchemaObject } from './schema/category.schema';
import { dbConnection } from 'src/common/constants/mongo.constant';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: CategorySchema.name,
          schema: CategorySchemaObject,
          collection: 'categories',
        },
      ],
      dbConnection.category,
    ),
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
