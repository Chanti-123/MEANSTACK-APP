const exp=require("express");
const app=exp();
const router=exp.Router();
const path = require("path");

//json
app.use(exp.json());

module.exports = router;

//importing user api
const userApp=require("./api/userApi");
const adminApp=require("./api/adminApi")


//forwarding requests to api
app.use("/user",userApp);
//app.use("/admin",adminApp);

//handling http request with server.js directly

      //connecting to db with db object
      // const dbo=require('../work/db');
      // dbo.initdb();





//middle ware to handle unavailable paths
app.use((req,res,next)=>{
      res.send({message:`path ${req.url} is not available`})
})

//importing dotenv module
const env=require('dotenv').config()


//setting port number from env file
port=process.env.port

app.listen(port,()=>{console.log(`server is running on ${port}`)});


// rm -rf node_modules
// npm install -g npm@latest
// npm i core-util-is