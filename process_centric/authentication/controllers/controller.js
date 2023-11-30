const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      status: "success",
      authenticated : true
    });
  }

  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies["token"];
  if (!token) {
    return res.status(200).json({
      status: "success",
      authenticated : false
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      status: "success",
      authenticated : true
    });
  } catch (err) {
    return res.status(200).json({
      status: "success",
      authenticated : false
    });
  }
  
};


module.exports.getUserInfo = async (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies["token"];
  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      status: "success",
      data : decoded
    });
  } catch (err) {
    return res.redirect("/");
  }


};
