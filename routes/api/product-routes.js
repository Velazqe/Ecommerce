import { Router } from 'express';
import  Product  from '../../models/product.js';
import Category from '../../models/category.js';
import Tag from '../../models/tag.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {include:[Category, Tag]});
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!product[0]) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json({ message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
