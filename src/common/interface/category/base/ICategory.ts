import { UUID } from 'crypto';

export interface ICategory {
  id: UUID;
  name: string;
  description?: string;
  featuredImage?: string;
  featured?: boolean;
  parentCategoryId?: string;
  archived: boolean;
}
