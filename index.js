const express = require('express');
const routes = require('./routes');
var cors = require('cors')
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
