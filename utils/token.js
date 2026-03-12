const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){
    const bearerHeader = req.headers.authorization;
    if( typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        try{
            const tokenUser = jwt.verify(bearerToken, process.env.JWT_SECRET);
            req.user = tokenUser;
            next();
        }catch(error){
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }else{
        res.status(403);
    }
}

module.exports = verifyToken