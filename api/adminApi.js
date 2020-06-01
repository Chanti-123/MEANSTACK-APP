const exp=require("express")
const adminApp=exp.Router();
const bcrypt=require('bcrypt');
adminApp.use(exp.json());

//connecting to db
const dbo=require('../db');
dbo.initdb();

module.exports=adminApp;