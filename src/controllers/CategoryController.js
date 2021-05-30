const categoryService = require('../services/CategoryService');

class CategoryController {
  async store(req, res) {
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({error: 'Field name required.'});
    }

    const data = await categoryService.create(name);
    return res.status(201).json(data);
  }

  async index(req, res, next) {
    try {
      const data = await categoryService.listAll();
      return res.json(data);
    } catch (error) {

    }
  }
}

module.exports = new CategoryController();
