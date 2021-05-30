if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
  console.log(`connection to database established`)
}).catch( err=> {
  console.log(`db error ${err.message}`);
  process.exit(-1)
});

const app = express();

const Category = require('./models/Category');

app.get('/', async (req, res) => {
  console.log(1)
  const category = await Category.create({
    name: 'Eletronics'
  })


  return res.json(category);
});

app.listen(process.env.SERVER_PORT, () => 
  console.log(`listening on port ${process.env.SERVER_PORT}`)
);