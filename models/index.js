import Category from './category.js';
import Product from './product.js';
import Tag from './tag.js';
import ProductTag from './productTag.js';


Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

export { Category, Product, Tag, ProductTag };
