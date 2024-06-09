import express from 'express';
import sequelize from './config/connections.js';
import categoryRoutes from './routes/api/category-routes.js';
import productRoutes from './routes/api/product-routes.js';
import tagRoutes from './routes/api/tag-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tags', tagRoutes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
