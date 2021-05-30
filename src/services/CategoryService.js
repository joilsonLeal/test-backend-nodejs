const Category = require('../models/Category');

class CategoryService {
  async create(name) {
    try {
      const category = await Category.create({name});
      return category;
    } catch (error) {
      console.error(`CategoryService::create::${error.message}`);
    }
  }

  async listAll() {
    try {
      const categories = await Category.find({}, { 
        __v: 0
      });
  
      return categories;
    } catch (error) {
      console.error(`CategoryService::listAll::${error.message}`);
      
    }
  }
}

module.exports = new CategoryService();
