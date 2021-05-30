const Category = require('../models/Category');
const ApplicationError = require('../exceptions/ApplicationException');
class CategoryService {
  async create(name) {
    try {
      const category = await Category.create({name});
      return category;
    } catch (error) {
      console.error(`CategoryService::create::${error.message}`);
      throw ApplicationError('Internal Error.');
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
      throw ApplicationError('Internal Error.');
    }
  }

  async findByName(name) {
    const category = await Category.findOne({name: name});
    return category;
  }
}

module.exports = new CategoryService();
