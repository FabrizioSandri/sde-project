module.exports.login = async (req, res) => {

  const { email, password } = req.body;

  let login_data = {
    email: email,
    password: password
  }

  let login_endpoint = `http://login:${process.env.LOGIN_SERVICE_PORT}/login`;
  try {
    response = await fetch(login_endpoint, {
      method: "POST",
      body: JSON.stringify(login_data),
      headers: { 'Content-Type': 'application/json' }
    });
    var result = await response.json();

    if (result.status != "success"){
      return res.status(400).json({
        status: "error",
        msg: result.msg
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "User login successful",
      token: result.token
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.toString()
    });
  }
};


module.exports.registration = async (req, res) => {
  const { name, surname, email, password } = req.body;
  
  let registration_data = {
    email: email,
    password: password,
    name: name,
    surname: surname
  }

  let registration_endpoint = `http://registration:${process.env.REGISTRATION_SERVICE_PORT}/registration`;
  try {
    response = await fetch(registration_endpoint, {
      method: "POST",
      body: JSON.stringify(registration_data),
      headers: { 'Content-Type': 'application/json' }
    });
    var result = await response.json();
    
    if (result.status != "success"){
      return res.status(400).json({
        status: "error",
        msg: result.msg
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "User registered"
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.toString()
    });
  }
};