const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const passport = require('./controllers/passport')
const cookieParser = require("cookie-parser");
let cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use session to track login state
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));

// Set up passport for Oauth
passport.initializePassport(app);

app.use('/', router);

// Start the server
const PORT = process.env.AUTHENTICATION_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
