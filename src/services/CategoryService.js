const Category = require('../models/Category');
const ApplicationError = require('../exceptions/ApplicationException');
class CategoryService {
  async create(name) {
    try {
      console.log(`CategoryService::create::payload: ${name}`);
      const category = await Category.create({name});
      return category;
    } catch (error) {
      console.error(`CategoryService::Error::create::${error.message}`);
      throw new ApplicationError('Internal Error.');
    }
  }
  
  async listAll() {
    try {
      console.log(`CategoryService::listAll`);
      const categories = await Category.find({}, { 
        __v: 0
      });
      return categories;
    } catch (error) {
      console.error(`CategoryService::Error::listAll::${error.message}`);
      throw new ApplicationError('Internal Error.');
    }
  }

  async findByName(name) {
    const category = await Category.findOne({name: name});
    return category;
  }
}

module.exports = new CategoryService();
