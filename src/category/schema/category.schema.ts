import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { ICategory } from 'src/common/interface/category/base/ICategory';
import { v7 as uuidv7 } from 'uuid';

@Schema({ timestamps: true })
export class CategorySchema implements ICategory {
  @Prop({ required: true, unique: true, default: () => uuidv7() })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  featuredImage?: string;

  @Prop({ default: false })
  featured?: boolean;

  @Prop()
  parentCategoryId?: string;

  @Prop({ default: false })
  archived: boolean;
}

export const CategorySchemaObject =
  SchemaFactory.createForClass(CategorySchema);
