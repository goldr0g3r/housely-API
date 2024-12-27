export interface ICreateCategory {
  name: string;
  description?: string;
  featuredImage?: string;
  featured?: boolean;
  parentCategoryId?: string;
}

export interface IUpdateCategory {
  name?: string;
  description?: string;
  featuredImage?: string;
  featured?: boolean;
  parentCategoryId?: string;
}
