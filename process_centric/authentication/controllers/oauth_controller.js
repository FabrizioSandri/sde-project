const passport = require('./passport').passport;
const jwt = require('jsonwebtoken');

module.exports.authenticate = passport.authenticate('google', {
  scope: ['email', 'profile']
});

module.exports.callback = passport.authenticate('google', { 
  failureRedirect: '/' 
});

module.exports.afterLogin = async (req, res) => {

  // Send a request to the registration endpoint to register the user. The
  // registration endpoint make sure to not register the user if it already
  // exists.

  let registration_data = {
    email: req.user._json.email,
    password: "google",
    name: req.user.name.givenName,
    surname: req.user.name.familyName
  }

  let registration_endpoint = `http://registration:${process.env.REGISTRATION_SERVICE_PORT}/registration`;
  try {
    response = await fetch(registration_endpoint, {
      method: "POST",
      body: JSON.stringify(registration_data),
      headers: { 'Content-Type': 'application/json' }
    });
    var result = await response.json();
    if (!('id' in result)){  // an error occurred
      return res.status(400).json({
        status: "error",
        msg: "Missing user id in the registration response"
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.toString()
    });
  }

  // Generate JWT token
  const token = jwt.sign({ 
    id: result.id,
    email: req.user.emails[0].value 
  }, process.env.JWT_SECRET);
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