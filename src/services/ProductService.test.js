const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/db_test';
mongoose.connect(mongoDB);

const Category = require('../models/Category');
const Product = require('../models/Product');
const productService = require('./ProductService');

let category = null;

describe('ProductService', () => {

  beforeAll(async () => {
    await Category.remove({});
    await Product.remove({});
    category = await Category.create({name: 'FAKE_CATEGORY'});
  });
  
  afterAll(async () => {
    await Category.remove({});
    await Product.remove({});
    await mongoose.connection.close();
  });

  it('should has a module', () => {
    expect(productService).toBeDefined();
  });

  it('Create::should create a product', async() => {
    const product = {
      title: 'FAKE_TITLE',
      description: 'FAKE_DESCRIPTION',
      price: 10.10,
    };
    const productResult = await productService.create(
      product.title, 
      product.description, 
      product.price,
      'FAKE_CATEGORY'
    );
    expect(productResult.title).toEqual(product.title);
    expect(productResult.description).toEqual(product.description);
    expect(productResult.price).toEqual(product.price);
    expect(productResult.category).toEqual(category._id);
  });

  it('ListAll::should return a list of all products', async() => {
    const products = await productService.listAll();
    expect(products.length).toEqual(1);
    expect(products[0].title).toEqual('FAKE_TITLE');
  });
  
  it('update::should update product information', async() => {
    const products = await productService.listAll();
    const product = products[0];
    const updatedProduct = await productService.update(product._id, 'NEW_TITLE', 'NEW_DESCRIPTION', 10);
    expect(updatedProduct.title).toEqual('NEW_TITLE');
    expect(updatedProduct.description).toEqual('NEW_DESCRIPTION');
    expect(updatedProduct.price).toEqual(10);
  });
  
  it('update::should update product category', async() => {
    const newCategory = await Category.create({name: 'NEW_CATEGORY'});
    const products = await productService.listAll();
    const product = products[0];
    const updatedProduct = await productService.updateCategory(product._id, 'NEW_CATEGORY');
    expect(updatedProduct.category).toEqual(newCategory._id);
  });

  it('filterByCategoryOrTitle::should return a product', async() => {
    const categoryFilter = await productService.filterByCategoryOrTitle('NEW_CATEGORY');
    const titleFilter = await productService.filterByCategoryOrTitle(undefined, 'NEW_TITLE');
    expect(categoryFilter[0].title).toEqual(titleFilter[0].title);
  });

  if('delete::should delete a product', async() => {
    const products = await productService.listAll();
    const product = await productService.delete(products[0]._id);
    expect(product.message).toBeDefined();
  });
});
