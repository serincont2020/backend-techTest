import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Company} from './company.model';
import {Category} from './category.model';
import {ProductCategory} from './product-category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Company, {name: 'productCompany'})
  companyId: string;

  @hasMany(() => Category, {through: {model: () => ProductCategory}})
  categories: Category[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
