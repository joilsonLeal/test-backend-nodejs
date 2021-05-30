const express = require("express");
const routes = express.Router();

const categoryController = require('./controllers/CategoryController');
const productController = require('./controllers/ProductController');

routes.get('/category', categoryController.index);
routes.post('/category', categoryController.store);

routes.get('/products', productController.index);
routes.get('/product', productController.filterProducts);
routes.post('/product', productController.store);
routes.put('/product/:id', productController.update);
routes.put('/product/:id/category', productController.updateCategory);
routes.delete('/product/:id', productController.delete);

module.exports = routes;