require("dotenv").config();
const prisma = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getCurrentUser(req, res){
    res.json(req.user);
}


async function userSignUp(req,res){
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

async function userLogin(req, res){
    try {
        const {email, password} = req.body;

        //Check for empty fields
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const userEmail = await prisma.user.findUnique({
            where: { email }
        });

        //Check for invalid email
        if(!userEmail){
            return res.status(401).json({error: "Invalid email"});
        }

        //Check for invalid password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({error: "Invalid password"});
        }

        //Create jwt token
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

async function getSinglePostByUser(req,res){
    const {userId, postId} = req.params;
    try {
        const post = await prisma.post.findFirst({
            where:{
                id: parseInt(postId),
                authorId: parseInt(userId)
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found for this user' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function allPostsByUser(req,res){
    const { userId } = req.params;
    try {
        
        const posts = await prisma.post.findMany({
            where:{
                authorId: parseInt(userId)
            }
        })

        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getAllUsers(req, res){
    try {
        const users = await prisma.user.findMany({
            select:{
                id: true,
                email: true,
                name: true,
                password: true
            },
        });

        return res.json(users);
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(req,res){
    try{
        const {userId} = req.params;
        const requester = req.user;

        const isAdmin = requester.isAdmin === true;
        const isSelf = requester.id === userId;

        if(!isAdmin && !isSelf){
            return res.status(403).json({message: "Forbidden"});
        }

        await prisma.user.delete({
            where:{ id: parseInt(userId)}
        });

        res.status(204).end();
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getCurrentUser,
    userSignUp,
    userLogin,
    getSinglePostByUser,
    allPostsByUser,
    getAllUsers,
    deleteUser
}