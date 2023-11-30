const jwt = require('jsonwebtoken');

module.exports.onlyAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies["token"];
  if (!token) {
    return res.redirect('/');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.redirect("/");
  }

}

