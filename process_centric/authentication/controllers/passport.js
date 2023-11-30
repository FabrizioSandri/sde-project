const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports.initializePassport = function (app) {

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
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // You can store user information in a database here
    return done(null, profile);
  }));

}

module.exports.passport = passport;