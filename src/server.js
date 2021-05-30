if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({message: 'hello world'});
});

app.listen(process.env.SERVER_PORT, () => 
  console.log(`listening on port ${process.env.SERVER_PORT}`)
);