const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async (req, res) => {
  
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
      authenticated : true,
      data : decoded
    });
  } catch (err) {
    return res.status(200).json({
      status: "success",
      authenticated : false
    });
  }
  
};
