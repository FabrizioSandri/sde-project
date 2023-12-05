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
  
  let query = `SELECT * FROM users WHERE email="${email}" AND password=SHA1("${password}");`;
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
        id: data[0].id,
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
        id: data[0].id
      });
    }

    // Insert the new user into the database
    let insertQuery = `INSERT INTO users (name, surname, email, password) VALUES( "${name}", "${surname}", "${email}", SHA1("${password}") );`;
    pool.query(insertQuery, (err, result) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          msg: err
        });
      }

      // user registered
      res.status(200).json({
        status: "success",
        msg: "User registered",
        id: result.insertId
      });
    });
    
  });

});

//==========================Football interests==========================

app.post('/addTeam', async (req, res) => {
  const {leagueId, teamId} = req.body;
  var userId;
  const optionCheckAuthentication = {
    method: 'GET',
    url: `http://authentication:${process.env.AUTHENTICATION_SERVER_PORT}/isAuthenticated`,
    params: {
      token: req.body.token
    }
  }
  try{
    let {data: data} = await axios.request(optionCheckAuthentication);
    if (data.authenticated == false){
      return res.status(401).json({
        status: "success",
        msg: "Authentication failed"
      })
    }else{
      userId = data.data.id; 
    }
  }catch(error){
    return res.status(400).json({
      sataus: "error",
      msg: error
    })
  }

  if (!leagueId || !teamId){
    return res.status(400).json({
      status: "error",
      msg: "team Id or league id parameter are invalid"
    });
  }
  if(!validateInput(userId) || !validateInput(leagueId) || !validateInput(teamId)){
    return res.status(400).json({
      status: "success",
      msg: "characters not allowed"

    })
  }
  let addTeamQuery=`INSERT INTO followedTeams (userId, leagueId, teamId) VALUES( "${userId}", "${leagueId}", "${teamId}");`;

  pool.query(addTeamQuery, (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        msg: err
      });
    }

    // team added
    res.status(200).json({
      status: "success",
      msg: "team added"
    });
  });
  
})

app.delete('/removeTeam', async (req, res) => {
  
  const teamId = req.query.teamId;
  var userId;
  const optionCheckAuthentication = {
    method: 'GET',
    url: `http://authentication:${process.env.AUTHENTICATION_SERVER_PORT}/isAuthenticated`,
    params: {
      token: req.body.token
    }
  }
  try{
    let {data: data} = await axios.request(optionCheckAuthentication);
    if (data.authenticated == false){
      return res.status(401).json({
        status: "success",
        msg: "Authentication failed"
      })
    }else{
      userId = data.data.id; 
    }
  }catch(error){
    return res.status(400).json({
      sataus: "error",
      msg: error
    })
  }

  if (!teamId){
    return res.status(400).json({
      status: "error",
      msg: "invalid team Id"
    });
  }
  if(!validateInput(userId) || !validateInput(teamId)){
    return res.status(400).json({
      status: "success",
      msg: "characters not allowed"

    })
  }
  let deleteTeamQuery=`DELETE FROM followedTeams WHERE userId=${userId} AND teamID=${teamId}`;

  pool.query(deleteTeamQuery, (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        msg: err
      });
    }

    // team deleted
    res.status(200).json({
      status: "success",
      msg: "team deleted"
    });
  });
})

app.get('/getTeams', async (req, res) => {
  var userId;
  const optionCheckAuthentication = {
    method: 'GET',
    url: `http://authentication:${process.env.AUTHENTICATION_SERVER_PORT}/isAuthenticated`,
    params: {
      token: req.body.token
    }
  }
  try{
    let {data: data} = await axios.request(optionCheckAuthentication);
    if (data.authenticated == false){
      return res.status(401).json({
        status: "success",
        msg: "Authentication failed"
      })
    }else{
      userId = data.data.id; 
    }
  }catch(error){
    return res.status(400).json({
      sataus: "error",
      msg: error
    })
  }

  if(!validateInput(teamId)){
    return res.status(400).json({
      status: "success",
      msg: "characters not allowed"

    })
  }
  let getTeamsQuery=`SELECT * FROM followedTeams WHERE userId=${userId}`;
  
  pool.query(getTeamsQuery,(error, result)=>{
    if (error){
      return res.status(200).json({
        status: "error",
        msg: error 
      })
    } 

    //sending teams
    res.status(200).json({
      status: "success",
      result: result
    });
  })
})


// Start the server
const PORT = process.env.DB_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//===========================utility function===========================
function validateInput(input){
  // Use a regular expression to check if the input contains only letters or numbers
  const regex = /^[a-zA-Z0-9@. ]+$/;
  return regex.test(input);
};