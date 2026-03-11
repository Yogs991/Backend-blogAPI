require("dotenv").config();
const { sign } = require("jsonwebtoken");
const prisma = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function signUpUser(req,res){
    const {email, name, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await prisma.user.create({
            data:{
                email: email,
                password: hashedPassword,
                name: name
            }
        });
        console.log("User successfully created");        
    }catch(error){
        console.log(error);        
    }
}

async function getUserFromDb(req, res){
    const {email, password} = req.body;
    try {
        
        await prisma.user.findUnique({
            where: { email: email }
        });
        if(!email) return res.status(401).json({error: "Invalid email"});

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(401).json({error: "Invalid password"});

        const token = jwt.sign({
            id: user.id,
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
        
        res.json({user: req.user, token});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signUpUser,
    getUserFromDb
}