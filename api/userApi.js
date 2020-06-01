// importing cloudinary, multer-storage-clodinary, multer
const cloudinary=require("cloudinary");
const cloudinaryStorage=require("multer-storage-cloudinary");
const multer=require("multer");

//configuring cloudinary with credentials
cloudinary.config({
    cloud_name:'dn6xns7i2',
    api_key:'393852381161365',
    api_secret:'h_XGWvr37gLJvbMY_ludljIuCsw'
})

//configuring storage at cloudinary
var storage=cloudinaryStorage({
    cloudinary:cloudinary,
    folder:"user-profiles",
    allowedFormats:["jpg","png"],
    filename:function(req,file,cb){
        cb(undefined,file.fieldname+"-"+Date.now());
    }
})

//now configure multer middleware
var upload=multer({storage:storage});



const exp=require("express");
const userApp=exp.Router();
const bcrypt=require('bcrypt');
const CircularJson=require("circular-json");

//importing jwt module
const jwt=require("jsonwebtoken");

userApp.use(exp.json());

//connecting to db with db object
const dbo=require('../db');
dbo.initdb();

//import "verify token" middleware
const checkAndVerifyToken=require("./middlewares/verifyToken")

//posting user data to db
userApp.post("/signup",upload.single("photo"),(req,res,next)=>{
    
        console.log("req body is",req.body)
        console.log("url is",req.file.secure_url);
        console.log("user data is",JSON.parse(req.body.userObj));
        //add image url to the userObj 
        //to add parse the userObj and add imageUrl to it
        req.body=JSON.parse(req.body.userObj);
        req.body.imageUrl=req.file.secure_url;

        //delete photo attached with the object
        delete req.body.photo;


      let userCollection=dbo.getdb().dbo.collection("users");
      userCollection.findOne({username:req.body.username},(err,userObj)=>{
        if(err){
            res.send({message:"error in searching users"})
        }
        else if(userObj==null){
            bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
                    if(err){
                        res.send({message:"error in hashing password"})
                    }
                    else{
                        req.body.password=hashedPassword;
                        userCollection.insertOne(req.body,(err,msg)=>{
                            if(err){
                                res.send({message:"error in posting data"});
                            }
                            else {
                                res.send({message:"registration successful"});
                            }
                        })
                    }
            })
           
        }
        else{
            res.send({message:"username already taken"});
        }
      })
     
 })

 //getting list of users
 userApp.get("/home",checkAndVerifyToken,(req,res)=>{
    dbo.getdb().dbo.collection("users").find().toArray((err,userslist)=>{
        if(err){
            res.send({message:'error in getting users'})
        }
        else{
           
            res.send({users:userslist})
        }
    });
    
    
    
})

//login 
userApp.post('/login',(req,res,next)=>{
    let userCollection=dbo.getdb().dbo.collection("users");
    userCollection.findOne({username:req.body.username},(err,userObj)=>{
        if(err){
            next(err);
        }
        if(userObj==null){
            res.send({message:"invalid username"});
        }
        //if user is existing compare hashed passwords
        else{
            bcrypt.compare(req.body.password,userObj.password,(err,isMatched)=>{
                if(err){
                    next(err);
                }
                //if passwords are not matched
                if(isMatched==false){
                    res.send({message:"invalid password"});
                }
                //if passwords are matched
                else{
                    //create a JWT token and send it as response to client
                    jwt.sign(
                        {username:userObj.username},
                        process.env.secret_KEY,
                        {expiresIn:20},
                        (err,signedToken)=>{
                            if(err){
                                next(err);
                            }
                            res.send({
                                message:"success",
                                token:signedToken,
                                username:userObj.username
                            });
                        }
                    )
                }
            })
        }
    })
})

//getting user profile
userApp.get('/profile/:username',checkAndVerifyToken,(req,res,next)=>{
    console.log(req.params);
    let userCollection=dbo.getdb().dbo.collection("users");
    userCollection.findOne({username:req.params.username},(err,userObj)=>{
        if(err){
            next(err);
        }
        else if(userObj==null){
            //if user not existed
            res.send({message:`${req.params.username} not existed`});
        }
        else{
            console.log(userObj)
            res.send({message:"user existed",data:userObj});
        }
    })
})


//error handling
userApp.use((err,req,res,next)=>{
    console.log("error is",err.message);
    res.send({message:"something went wrong"});
})

//exporting userApp
module.exports = userApp;