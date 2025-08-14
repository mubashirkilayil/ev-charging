const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./Routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('Public'));

app.use('/api', routes);

app.listen(2000, () => {
  console.log('EC charging app server running @ http://localhost:2000/');
});
