const passport = require('./passport').passport;

module.exports.authenticate = passport.authenticate('google', {
  scope: ['email', 'profile']
});

module.exports.callback = passport.authenticate('google', { 
  failureRedirect: '/' 
});

module.exports.afterLogin = (req, res) => {
  res.redirect('/google/getUserData');
}

module.exports.getUserData = async (req, res) => {
  data = {
    displayName : req.user.displayName,
    name: req.user.name.givenName,
    surname: req.user.name.familyName,
    email: req.user.emails[0].value
  };
  
  res.status(200).json({
    status: "success",
    data: data
  });
};

module.exports.isAuthenticated = async (req, res) => {
  res.status(200).json({
    status: "success",
    authenticated : req.isAuthenticated()
  });
};

module.exports.logout = async (req, res) => {
  req.logout();
  res.status(200).json({
    status: "success"
  });
};


module.exports.passport = passport;