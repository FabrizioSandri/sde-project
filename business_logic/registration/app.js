const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.send('Registration interface');
});

app.post('/registration', async (req, res) => {
  const { name, surname, email, password } = req.body;

  // Validation for required fields
  if (!name || !surname || !email || !password) {
    return res.status(400).json({
      status: 'error',
      msg: 'All fields (name, surname, email, password) are required for registration',
    });
  }

  // Check the validity of the email using the EVA api, through it's adapter
  let eva_endpoint = `http://eva_adapter:${process.env.EVA_ADAPTER_SERVER_PORT}/checkEmail`;
  eva_endpoint += `?email=${email}`;

  try {
    response = await fetch(eva_endpoint, {
      method: "GET"
    });
    
    let result = await response.json();

    // The user provided an invalid email
    if (result.data.disposable || result.data.spam || !result.data.valid_syntax){ 
      return res.status(400).json({
        status: "error",
        msg: "Please provide a valid email"
      });
    }

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.toString()
    });
  }

  // Register the user
  let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/registerUser`;
  let user_data = {
    name: name,
    surname: surname,
    email: email,
    password: password
  };
  try {
    response = await fetch(db_endpoint, {
      method: "POST",
      body: JSON.stringify(user_data),
      headers: { 'Content-Type': 'application/json' }
    });
    
    let result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.toString()
    });
  }

});


// Start the server
const PORT = process.env.REGISTRATION_SERVICE_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
