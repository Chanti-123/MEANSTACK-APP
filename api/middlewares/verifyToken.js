const jwt=require("jsonwebtoken");

var checkAndValidateToken=(req,res,next)=>{

    console.log("req headers :",req.headers.authorization);
    let signedTokenWithBearer=req.headers.authorization;
    //check token existence
    if(signedTokenWithBearer==undefined){
        res.send({message:"Unauthorized access"})
    }
    else{
        //remove first seven characters since token is attached with "bearer " 
        let signedToken=signedTokenWithBearer.slice(7,signedTokenWithBearer.length);
        jwt.verify(signedToken,'abcdef',(err,decodedToken)=>{
            if(err){
                res.send({message:"session has expired"});

            }
            else{
                next();
            }
        })
    }
}

//export checkAndValidateToken to make it available for other apis

module.exports=checkAndValidateToken;