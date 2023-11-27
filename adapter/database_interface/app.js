const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database configuration
const dbConfig = {
  host: 'database',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.DB_PORT
};

const pool = mysql.createPool(dbConfig);

// Set up routes
app.get('/', (req, res) => {
  res.send('MySQL db interface');
});

// Authentication endpoints: login and registration
app.get('/findUser', (req, res) => {
  
  const email = req.query.email;
  const password = req.query.password;

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
  
  let query = `SELECT * FROM users WHERE email="${email}" AND password="${password}";`;
  pool.query(query, (err, data) => {
    if (err){
      return res.status(400).json({
        status: "error",
        msg: err
      });
    }

    // user not found
    if (data.length == 0){
      return res.status(404).json({
        status: "error",
        msg: "User not found"
      });
    }

    // else user found
    return res.status(200).json({
      status: "success",
      msg: "User found",
      user_info: {
        name: data[0].name,
        surname: data[0].surname,
        email: data[0].email,
      }
    });

  });
  
});

app.post('/registerUser', async (req, res) => {
  const { name, surname, email, password } = req.body;

  // Validation for required fields
  if (!name || !surname || !email || !password) {
    return res.status(400).json({
      status: 'error',
      msg: 'All fields (name, surname, email, password) are required for registration',
    });
  }

  // Check if the email is already registered
  const checkEmailQuery = `SELECT * FROM users WHERE email="${email}";`;
  pool.query(checkEmailQuery, (err, data) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        msg: err
      });
    }

    if (data.length > 0) {
      return res.status(400).json({
        status: 'error',
        msg: 'Email is already registered',
      });
    }

    // Insert the new user into the database
    let insertQuery = `INSERT INTO users (name, surname, email, password) VALUES( "${name}", "${surname}", "${email}", "${password}" );`;
    pool.query(insertQuery, (err) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          msg: err
        });
      }

      // user registered
      res.status(200).json({
        status: "success",
        msg: "User registered"
      });
    });
    
  });

});


// Start the server
const PORT = process.env.DB_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

