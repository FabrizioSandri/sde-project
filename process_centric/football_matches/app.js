const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', router)


const PORT = process.env.FOOTBALLMATCHES_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});