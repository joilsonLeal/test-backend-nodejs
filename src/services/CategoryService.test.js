const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/db_test';
mongoose.connect(mongoDB);

const Category = require('../models/Category');
const categoryService = require('./CategoryService');

describe('CategoryService', () => {

  beforeAll(async () => {
    await Category.remove({});
  });
  
  afterAll(async () => {
    await Category.remove({});
    await mongoose.connection.close();
  });

  it('should has a module', () => {
    expect(categoryService).toBeDefined();
  });

  it('Create::should create a category', async() => {
    const categoryName = 'FAKE_CATEGORY';
    const category = await categoryService.create(categoryName);
    expect(category.name).toEqual(categoryName);
  });

  it('FindByName::should return a category', async() => {
    const categoryName = 'FAKE_CATEGORY';
    const category = await categoryService.findByName(categoryName);
    expect(category.name).toEqual(categoryName);
    expect(category._id).toBeDefined();
  });

  it('ListAll::should return a list of all categories', async() => {
    const categories = await categoryService.listAll();
    expect(categories.length).toEqual(1);
    expect(categories[0].name).toEqual('FAKE_CATEGORY');
  });
});
