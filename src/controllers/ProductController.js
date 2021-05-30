const productService = require("../services/ProductService");

class ProductController {
  async store(req, res) {
    const {title, description, price, category} = req.body;
    
    try {
      const data = await productService.create(
        title, 
        description, 
        price, 
        category
      );
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  async index(req, res, next) {
    try {
      const data = await productService.listAll();
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
      const product = await productService.update(id, title, description, price);
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    
    try {
      const result = await productService.delete(id);
      return res.json({message: 'Product successfully removed.'})
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  async filterProducts(req, res) {
    const {category, name} = req.query;
    
    try {
      const products = await productService.filterByCategoryOrTitle(category, name);
      return res.json(products);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });;
    }

  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { category } = req.body;
   
    try {
      const product = await productService.updateCategory(id, category);
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();