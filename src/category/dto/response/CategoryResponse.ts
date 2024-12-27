import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';
import { ICategory } from 'src/common/interface/category/base/ICategory';
import { v7 as uuidv7 } from 'uuid';

export class CategoryResponse implements ICategory {
  @ApiProperty({
    title: 'Category ID',
    description: 'Unique ID of the category',
    example: () => uuidv7(),
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Name',
    description: 'Name of the category',
    example: 'Residential',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description of the category',
    example: 'Residential properties',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    title: 'Featured Image',
    description: 'Featured image of the category',
    example: 'https://www.example.com/image.jpg',
  })
  @Expose()
  featuredImage?: string;

  @ApiProperty({
    title: 'Featured',
    description: 'Is the category featured',
    example: false,
  })
  @Expose()
  featured?: boolean;

  @ApiProperty({
    title: 'Parent Category ID',
    description: 'Parent category ID',
    example: () => uuidv7(),
  })
  @Expose()
  parentCategoryId?: string;

  @ApiProperty({
    title: 'Archived',
    description: 'Is the category archived',
    example: false,
  })
  @Expose()
  archived: boolean;

  @ApiProperty({
    title: 'Created At',
    description: 'Date and time of when the category was created',
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    description: 'Date and time of when the category was last updated',
    example: new Date(),
  })
  @Expose()
  updatedAt: Date;
}
