const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Login business logic is running');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email){
    return res.status(400).json({
      status: "error",
      msg: "The email is required for login"
    });
  }

  if (!password){
    return res.status(400).json({
      status: "error",
      msg: "The password is required for login"
    });
  }

  // find user in DB
  db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/findUser`;
  db_endpoint += `?email=${email}&password=${password}`;

  try {
    response = await fetch(db_endpoint, {
      method: "GET"
    });
    var user = await response.json();

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error
    });
  }

  // check if the user exists
  if (user.status != "success") {
    return res.status(401).json({ 
      status: "error",
      msg: "Invalid credentials" 
    });
  }

  // Generate JWT token
  const token = jwt.sign({ 
    id: user.user_info.id, 
    email: user.user_info.email 
  }, process.env.JWT_SECRET);
  return res.status(200).json({
    status: "success",
    msg: "User login successful",
    token: token
  });

});



// Start the server
const PORT = process.env.LOGIN_SERVICE_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
