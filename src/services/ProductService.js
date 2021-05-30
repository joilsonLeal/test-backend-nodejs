const Product = require('../models/Product');
const categoryService = require('./CategoryService');

class ProductService {
  async create(title, description, price, category) {
    try {
      const categoryResult = await categoryService.findByName(category)
      if(!categoryResult) {
        throw Error('Category not found.');
      }
      const product = await Product.create({title, description, price, category: categoryResult._id});
      return product;
    } catch (error) {
      console.error(`ProductService::create::${error.message}`);
      throw Error(error.message)
    }
  }

  async listAll() {
    try {
      const data = await Product.find({}, {__v: 0}).populate('category', {__v: 0});
      return data;
    } catch (error) {

    }
  }

  async update(id, title, description, price) {
    const product = await Product.findById(id)
    if(!product) {
      throw Error('product not found.');
    }

    const result = await Product.findByIdAndUpdate(id, { 
      title: title || product.title, 
      description: description || product.description, 
      price: price || product.price,
    });

    return result;
  }

  async delete(id) {
    const product = await Product.findById(id)
    if(!product) {
      throw Error('product not found.');
    }

    const result = await Product.findByIdAndDelete(id);
    return result;
  }

  async updateCategory(id, category) {
    try {
      const result = await categoryService.findByName(category);
      if(!result) {
        throw Error('category not found.')
      }
      const products = await Product.findByIdAndUpdate(product._id, { 
        category: result._id
      });
      return products;
    } catch (error) {
      throw Error(error.message)
    }
    
  }

  async filterByCategoryOrTitle(category, name) {
    if(category){
      const result = await categoryService.findByName(category);
      if(result) {
        const products = await Product.find({ category: result._id }, {__v: 0}).populate('category', {__v: 0});
        return products;
      }
      throw Error('category not found.')
    }else{
      const products = await Product.find({
        'title' : name
      }, {
        __v: 0
      }).populate('category',{__v: 0});
      return products;
    }
  }
}

module.exports = new ProductService();
