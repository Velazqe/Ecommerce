import { Router } from 'express';
import { Category, Product } from '../../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {include:Product});
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!category[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
