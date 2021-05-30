const categoryService = require('../services/CategoryService');
const cache = require('../utils/CacheUtil');

class CategoryController {
  async store(req, res) {
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({error: 'Name is required.'});
    }

    const data = await categoryService.create(name);
    return res.status(201).json(data);
  }

  async index(req, res, next) {
    try {
      const cached = await cache.get('categories');

      if(cached) {
        console.log('cached')
        return res.json(cached);
      }

      const data = await categoryService.listAll();

      cache.set('categories', data);
      return res.json(data);
    } catch (error) {

    }
  }
}

module.exports = new CategoryController();
