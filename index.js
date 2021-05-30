const express = require("express");
const config = require("./src/database/config");
const mongoose = require('mongoose');
const routes = require("./src/routes");

const Server = require('./src/server');

const app = Server(express, mongoose, config, routes).app;

app.listen(process.env.SERVER_PORT || 3001, () =>
  console.log(`Sua API REST está funcionando na porta 3001 `)
);
