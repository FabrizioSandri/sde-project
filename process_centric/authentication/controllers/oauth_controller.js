const passport = require('./passport').passport;
const jwt = require('jsonwebtoken');

module.exports.authenticate = passport.authenticate('google', {
  scope: ['email', 'profile']
});

module.exports.callback = passport.authenticate('google', { 
  failureRedirect: '/' 
});

module.exports.afterLogin = (req, res) => {

  // Generate JWT token
  const token = jwt.sign({ email: req.user.emails[0].value }, process.env.JWT_SECRET);
  return res.status(200).json({
    status: "success",
    msg: "User login successful",
    token: token
  });

}

module.exports.logout = async (req, res) => {
  req.logout();
  res.status(200).json({
    status: "success"
  });
};

module.exports.passport = passport;