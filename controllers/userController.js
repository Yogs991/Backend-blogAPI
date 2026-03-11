require("dotenv").config();
const prisma = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function signUpUser(req,res){
    try{
        const {email, name, password} = req.body;

        // Check for missing credentials
        if(!email || !name || !password){
            return res.status(400).json({message: "Name, email, password are required"});
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const newUser = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                name
            }
        });
        res.status(201).json({
            message: "User registered succesfully",
            user:{
                id: newUser.id,
                password: newUser.password,
                name: newUser.name
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });        
    }
}

async function getUserFromDb(req, res){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }
        const userEmail = await prisma.user.findUnique({
            where: { email }
        });

        if(!userEmail){
            return res.status(401).json({error: "Invalid email"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error: "Invalid password"});
        }
        const token = jwt.sign(
            {userId: user.id, userEmail: user.email, userName: user.name},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        )
        
        res.status(200).json({
            message:"Login successfull",
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        res.status(403);
    }
}

module.exports = {
    signUpUser,
    getUserFromDb,
    verifyToken
}