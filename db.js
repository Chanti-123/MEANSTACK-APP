var mc=require("mongodb").MongoClient;
const env=require('dotenv').config()
var dbo;
function initdb(){
    
    mc.connect(process.env.mongo_URL,{useUnifiedTopology:true},
    (err,client)=>{
        if(err){
            console.log("error in connecting db");
        }
        else{
             dbo=client.db("work");
            console.log("connected to db");
            
        }
    });
}
function getdb(){
    //console.log(dbo,"db has initialized");
    
    return {
        dbo:dbo,
    }
}
module.exports={
    getdb,initdb
}
