const express = require('express');
const axios = require('axios');

const app = express();

app.get('/getCoordinates',(req,res)=>{
  if(!req.query.place){
    return res.status(400).json({
      status:'error',
      msg:'no place indicated'   
    })
  }
  const options = {
    method: 'GET',
    url: 'http://api.positionstack.com/v1/forward',
    params:{
      access_key: process.env.STACKPOSITZION_ACCESSKEY,
      query: req.query.place
    }
    };
  
  
    axios.request(options)
    .then((result)=>{
      res.send(result.data)
    })
    .catch((err)=>{
      console.log(err);
    });
  
  })

const PORT = process.env.POSITIONSTACK_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    