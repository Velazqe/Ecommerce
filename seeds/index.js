import sequelize from '../config/connections.js';
import seedCategories from './category-seeds.js';
import seedProducts from './product-seeds.js';
import seedTags from './tag-seeds.js';
import seedProductTags from './product-tag-seeds.js';

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  await seedCategories();
  console.log('Categories seeded!');

  await seedProducts();
  console.log('Products seeded!');

  await seedTags();
  console.log('Tags seeded!');

  await seedProductTags();
  console.log('Product tags seeded!');

  process.exit(0);
};

seedAll();
