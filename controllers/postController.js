require("dotenv").config();
const prisma = require("../lib/prisma.js");

async function getAllPosts(req,res){
    try{
        const posts = await prisma.post.findMany({
            where:{isPublished: false},
            orderBy:{ createdAt: 'desc'},
            include:{
                author:{
                    select:{ name: true }
                }
            }
        });

        res.status(200).json({
            message: "Post successfully sent",
            data: posts
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getCertainPost(req,res){
    const {postId} = req.params;
    try{
        const post = await prisma.post.findUnique({
            where: {id: parseInt(postId)},
            include:{
                author:{
                    select: {name: true}
                }
            }
        });

        //Check if post exists
        if(!post){
            return res.status(400).json({message: 'Post not found'});
        }

        res.status(200).json(post);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function createPost(req,res){
    const {title, content, published} = req.body;
    try{
        const post = await prisma.post.create({
            data:{
                title: title,
                content: content,
                isPublished: published || false,
                authorId: parseInt(req.user.userId)
            }
        });
        res.status(201).json(post);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function editPost(req, res){
    const {postId} = req.params;
    const {title, content, published} = req.body;
    try{
        const existingPost = await prisma.post.findUnique({
            where: {id: parseInt(postId)},
        });

        if(!existingPost){
            return res.status(404).json({message: "Post not found"});
        }

        const updatePost = await prisma.post.update({
            where:{ id: parseInt(postId) },
            data:{
                title: title,
                content: content,
                isPublished: published
            }
        });
        res.status(200).json(updatePost);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function deletePost(req, res){
    const { postId } = req.params;
    try{
        const existingPost = await prisma.post.findUnique({
            where: {id: parseInt(postId)},
        });

        if(!existingPost){
            return res.status(404).json({message: "Post not found"});
        }

        if(existingPost.authorId !== req.user.id && !req.user.isAdmin){
            return res.status(403).json({message: 'Not authorized to delete this post'});
        }

        await prisma.post.delete({
            where:{ id: parseInt(id)}
        });

        res.status(200).json({message: 'Post deleted succesfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getCommentsForPost(req, res){
    const {postId} = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: {postId: parseInt(postId)},
            include: {
                author: {
                    select:{ name : true}
                }
            }
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments for post:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getCommentById(req, res){
    const {postId, commentId} = req.params;
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(commentId),
                postId: parseInt(postId)
            },
            include:{
                author:{
                    select:{ name: true},
                }
            }
        });

        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error("Error fetching comments for post: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllPosts,
    getCertainPost,
    createPost,
    editPost,
    deletePost,
    getCommentsForPost,
    getCommentById
}