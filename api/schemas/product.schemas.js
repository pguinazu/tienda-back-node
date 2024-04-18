const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const category = Joi.string().min(3).max(15);

// name y price son requeridos para la creacion de un producto
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});
// name y price son opcionales para la actualizacion de un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});
// id es requerido para obtener un producto
const getProductSchema = Joi.object({
  id: id.required(),
});

const getProductsByCategory = Joi.object({
  category: category.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, getProductsByCategory };
