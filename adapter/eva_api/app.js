const express = require('express');
const bodyParser = require('body-parser');
var fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.send('EVA API adapter');
});

app.get('/checkEmail', async (req, res) => {
  
  const email = req.query.email;

  if (!email){
    return res.status(400).json({
      status: "error",
      msg: "The email is required"
    });
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' // workaround for fetch problem
  const eva_endpoint = `https://api.eva.pingutil.com/email?email=${email}`;
  try {
    response = await fetch(eva_endpoint, {
      method: "GET"
    });

    let result = await response.json();

    // Adapt the data
    return res.status(200).json({
      status: "success",
      msg: "Email status retrieved",
      data: {
        valid_syntax: result.data.valid_syntax,
        disposable: result.data.disposable,
        deliverable: result.data.deliverable,
        spam: result.data.spam
      }
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error
    });
  }
  
});


// Start the server
const PORT = process.env.EVA_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

