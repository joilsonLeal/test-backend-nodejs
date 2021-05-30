const productService = require("../services/ProductService");

class ProductController {
  async store(req, res) {
    try {
      const {title, description, price, category} = req.body;
      const data = await productService.create(
        title, 
        description, 
        price, 
        category
      );

      return res.status(201).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async index(req, res, next) {
    const data = await productService.listAll();
    return res.json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
      const product = await productService.update(id, title, description, price);
      return res.json(product);
    } catch (error) {
      return res.status(404).json({message: error.message})
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    
    try {
      const result = await productService.delete(id);
      return res.json({message: 'Produto deletado com sucesso.', data: result})
    } catch (error) {
      return res.status(404).json({message: error.message})
    }
  }

  async filterProducts(req, res) {
    const {category, name} = req.query;
    try {
      const products = await productService.filterByCategoryOrTitle(category, name);
      return res.json(products);
      
    } catch (error) {
      return res.status(404).json({message: error.message});
    }

  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { category } = req.body;
    try {
      const product = await productService.updateCategory(id, category);
      return res.json(product);
    } catch (error) {
      return res.status(404).json({message: error.message});
    }
  }
}

module.exports = new ProductController();