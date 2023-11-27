const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use session to track login state
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // You can store user information in a database here
      return done(null, profile);
    }
  )
);

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello, welcome to the API!<a href="/authenticate"> Auth </a>');
});

// Authenticate with Google
app.get(
  '/authenticate',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Google callback URL
app.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/getUserData');
  }
);

app.get('/getUserData', isAuthenticated, (req, res) => {
  data = {
    displayName : req.user.displayName,
    name: req.user.name.givenName,
    surname: req.user.name.familyName,
    email: req.user.emails[0].value
  };
  
  res.json(data);
});

app.get('/isAuthenticated', (req, res) => {
  data = {
    authenticated : req.isAuthenticated()
  };
  res.json(data)
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Start the server
const PORT = process.env.OAUTH_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
