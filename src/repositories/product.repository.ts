import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Company, Category, ProductCategory} from '../models';
import {CompanyRepository} from './company.repository';
import {ProductCategoryRepository} from './product-category.repository';
import {CategoryRepository} from './category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly productCompany: BelongsToAccessor<Company, typeof Product.prototype.id>;

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.id,
          ProductCategory,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Product, dataSource);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.productCompany = this.createBelongsToAccessorFor('productCompany', companyRepositoryGetter,);
    this.registerInclusionResolver('productCompany', this.productCompany.inclusionResolver);
  }
}
