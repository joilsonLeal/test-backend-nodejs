const Product = require('../models/Product');
const categoryService = require('./CategoryService');
const ApplicationError = require('../exceptions/ApplicationException');

class ProductService {
  async create(title, description, price, category) {
    try {
      console.log(`ProductService::create::payload:: title: ${title}, description: ${description}, price: ${price}, category: ${category}`);
      const categoryResult = await categoryService.findByName(category)
      if(!categoryResult) {
        throw new ApplicationError('Category not found.', 400);
      }

      const product = await Product.create({title, description, price, category: categoryResult._id});
      return product;
    } catch (error) {
      console.error(`ProductService::Error::create::${error.message}`);
      throw new ApplicationError(
        error.message || 'Internal error',
        error.status || 500
      );
    }
  }

  async listAll() {
    try {
      console.log(`ProductService::listAll`);
      const data = await Product.find({}, {__v: 0}).populate('category', {__v: 0});
      return data;
    } catch (error) {
      console.error(`ProductService::Error::listAll::${error.message}`);
      throw new ApplicationError('Internal Error.');
    }
  }

  async update(id, title, description, price) {
    try {
      console.log(`ProductService::create::payload:: id: ${id}, title: ${title}, description: ${description}, price: ${price}`);
      const product = await Product.findById(id)
      if(!product) {
        throw new ApplicationError('Product not found.', 400);
      }

      const result = await Product.findByIdAndUpdate(id, { 
        title: title || product.title, 
        description: description || product.description, 
        price: price || product.price,
      }, {new: true});
  
      return result;
    } catch (error) {
      console.error(`ProductService::Error::update::${error.message}`);
      throw new ApplicationError(
        error.message || 'Internal error',
        error.status || 500
      );
    }
  }

  async delete(id) {
    try {
      console.log(`ProductService::delete::payload:: id: ${id}`);
      const product = await Product.findById(id)
      if(!product) {
        throw new ApplicationError('Product not found.', 400);
      }

      const result = await Product.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`ProductService::Error::delete::${error.message}`);
      throw new ApplicationError(
        error.message || 'Internal error',
        error.status || 500
      );
    }
  }

  async updateCategory(id, category) {
    try {
      console.log(`ProductService::updateCategory::payload:: id: ${id}, category: ${category}`);
      const categoryResult = await categoryService.findByName(category);
      if(!categoryResult) {
        throw new ApplicationError('Category not found.', 400);
      }

      const productResult = await Product.findById(id);
      if(!productResult) {
        throw new ApplicationError('Product not found.', 400);
      }

      const product = await Product.findByIdAndUpdate(id, { 
        category: categoryResult._id
      }, {new: true});
      return product;
    } catch (error) {
      console.error(`ProductService::Error::updateCategory::${error.message}`);
      throw new ApplicationError(
        error.message || 'Internal error',
        error.status || 500
      );
    }
  }

  async filterByCategoryOrTitle(category = '', name = '') {
    try {
      if(category){
        console.log(`ProductService::filterByCategoryOrTitle::category::${category}`);
        const result = await categoryService.findByName(category);
        if(!result) {
          throw new ApplicationError('Category not found.', 400);
        }
        const products = await Product.find({ category: result._id }, 
          {__v: 0}).populate('category', {__v: 0}
        );
        return products;
      }else{
        console.log(`ProductService::filterByCategoryOrTitle::title::${name}`);
        const products = await Product.find({
          'title' : name
        }, {
          __v: 0
        }).populate('category', {__v: 0});
        return products;
      }
    } catch (error) {
      console.error(`ProductService::Error::filterByCategoryOrTitle::${error.message}`);
      throw new ApplicationError(
        error.message || 'Internal error',
        error.status || 500
      );
    }
  }
}

module.exports = new ProductService();
