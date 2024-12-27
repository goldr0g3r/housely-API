import { ApiProperty } from '@nestjs/swagger';
import { ICreateCategory } from 'src/common/interface/category/request/ICreateCategory';

export class CreateCategoryRequest implements ICreateCategory {
  @ApiProperty({
    title: 'Category Name',
    description: 'Name of the category',
    example: 'Residential',
  })
  name: string;

  @ApiProperty({
    title: 'Category Description',
    description: 'Description of the category',
    example: 'Residential properties',
  })
  description: string;

  @ApiProperty({
    title: 'Category Image',
    description: 'Image of the category',
    example: 'image.jpg',
  })
  featuredImage?: string;

  @ApiProperty({
    title: 'Category Parent',
    description: 'Parent category',
    example: 'Residential',
  })
  parentCategoryId?: string;

  @ApiProperty({
    title: 'Featured',
    description: 'Is the category featured',
    example: true,
  })
  featured: boolean;
}
