const express = require("express");
const routes = express.Router();

const categoryController = require('./controllers/CategoryController');

routes.get('/category', categoryController.index);
routes.post('/category', categoryController.store);

module.exports = routes;