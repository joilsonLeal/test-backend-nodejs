const request = require('supertest');
const express = require('express');
const config = require("../database/config");
const mongoose = require('mongoose');
const routes = require("../routes");

const Server = require('../server');
const Category = require('../models/Category');

const app = Server(express, mongoose, config, routes).app; 

describe('CategoryController', () => {

  beforeAll(async () => {
    await Category.remove({});
  });

  afterAll(async () => {
    await Category.remove({});
  });

  it('store::should create a category', async() => {
    const res = await request(app)
    .post('/category').send({
      name: 'FAKE_CATEGORY'
    });
    expect(res.status).toBe(201);
  });

  it('index::should return a list of categories', async() => {
    const res = await request(app)
    .get('/category');
    expect(res.status).toBe(200);
  });

  it('store::should throw an error if category already exists', async() => {
    const res = await request(app)
    .post('/category').send({
      name: 'FAKE_CATEGORY'
    });
    expect(res.status).toBe(500);
  });

  it('store::should throw an error if name is null', async() => {
    const res = await request(app)
    .post('/category').send();
    expect(res.status).toBe(400);
  });
});
