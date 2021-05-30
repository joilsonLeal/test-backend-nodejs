const request = require('supertest');
const express = require('express');
const config = require("../database/config");
const mongoose = require('mongoose');
const routes = require("../routes");

const Server = require('../server');
const Category = require('../models/Category');
const Product = require('../models/Product');


const app = Server(express, mongoose, config, routes).app; 

describe('ProductController', () => {

  beforeAll(async () => {
    await Category.remove({});
    await Product.remove({});
    await Category.create({name: 'FAKE_CATEGORY'});
    await Category.create({name: 'FAKE_CATEGORY2'});
  });

  afterAll(async () => {
    await Category.remove({});
    await Product.remove({});
  });

  it('index::should return a list of products', async() => {
    const res = await request(app)
    .get('/products');
    expect(res.status).toBe(200);
  });
  
  it('store::should throw an error if category does not exists', async() => {
    const res = await request(app)
    .post('/product').send({
      category: 'CATEGORY'
    });
    expect(res.status).toBe(400);
  });

  it('store::should create a product', async() => {
    const res = await request(app)
    .post('/product').send({
      title: 'FAKE_TITLE',
      description: 'FAKE_DESCRIPTION',
      price: 12,
      category: 'FAKE_CATEGORY'
    });
    expect(res.status).toBe(201);
  });
  
  it('updateCategory::should throw an error if category does not exist', async() => {
    const products = await Product.find();
    const res = await request(app)
    .put(`/product/${products[0]._id}/category`).send({
      category: 'FAKE_CATEGORY2'
    });
    expect(res.status).toBe(200);
  });
  
  it('updateCategory::should update a product category', async() => {
    const products = await Product.find();
    const res = await request(app)
    .put(`/product/${products[0]._id}/category`).send();
    expect(res.status).toBe(400);
  });

  it('update::should update a product information', async() => {
    const products = await Product.find();
    const res = await request(app)
    .put(`/product/${products[0]._id}`).send({
      title: 'NEW_TITLE'
    });
    expect(res.status).toBe(200);
  });

  it('filteredProducts::should return a list of products', async() => {
    const res = await request(app)
      .get('/product?category=FAKE_CATEGORY');
      expect(res.status).toBe(200);
  });

  it('filteredProducts::should throw an error if category does not exist', async() => {
    const res = await request(app)
      .get('/product?category=FAKE');
      expect(res.status).toBe(400);
  });

  it('delete::should throw an error if product does not exist', async() => {
    const res = await request(app)
      .delete('/product/FAKE_ID');
    expect(res.status).toBe(500);
  });

  it('delete::should delete product', async() => {
    const products = await Product.find();
    const res = await request(app)
      .delete(`/product/${products[0]._id}`);
    expect(res.status).toBe(200);
  });
});
