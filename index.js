const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = 3000;

app.use('/api', routes);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
