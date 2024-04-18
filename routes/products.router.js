const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/schema.validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, getProductsByCategory } = require('../schemas/product.schemas');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Filtro');
});

router.get('/category/:category',
  validatorHandler(getProductsByCategory, 'params'), // esto es un middleware para validar la category traida en la query
  async (req, res) => { // esto tambien es un middleware
  const category = req.params.category;
  console.log(category);
  const productsByCategory = await service.findByCategory(category);
  res.status(201).json({ productsByCategory });
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'), // esto es un middleware, donde en el primer parametro se le pasa el schema y en el segundo el tipo de dato
  async (req, res, next) => { // esto tambien es un middleware
    try {
      const { id } = req.params;
      const productById = await service.findOne(id);
      res.status(200).json({ productById });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'), // esto es un middleware, donde en el primer parametro se le pasa el schema y en el segundo el tipo de dato
  async (req, res) => {
  const id = req.params.id;
  const productsWithoutThis = await service.delete(id);
  res.status(200).json({
    message: 'deleted',
    productsWithoutThis
  });
});

router.post('/',
  validatorHandler(createProductSchema, 'body'), // esto es un middleware, donde en el primer parametro se le pasa el schema y en el segundo el tipo de dato
  async (req, res) => { // esto tambien es un middleware
  const newProduct = await service.create(req.body);
  res.status(201).json({
    message: 'created',
    data: newProduct
  });
});

router.patch('/:id',
  //middlewares de forma secuencial
  validatorHandler(getProductSchema, 'params'), // esto es un middleware, donde en el primer parametro se le pasa el schema y en el segundo el tipo de dato
  validatorHandler(updateProductSchema, 'body'), // esto es un middleware, donde en el primer parametro se le pasa el schema y en el segundo el tipo de dato
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id, body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
