const prisma = require("../lib/prisma.js");

async function getCommentsForPost(req,res){
    const { postId } = req.params;
    try{
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(postId)},
            include:{
                author:{
                    select: { name: true }
                }
            }
        });

        res.status(200).json(comments);
    }catch(error){
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getCommentById(req, res){
    const { postId, commentId} = req.params;
    try{
        const comment = await prisma.comment.findUnique({
            where:{
                id: parseInt(commentId),
                postId: parseInt(postId)
            },
            include:{
                author:{
                    select: { name: true }
                }
            }
        });

        if(!comment){
            return res.status(404).json({message: 'Comment not found'});
        }
        
        res.status(200).json(comment);
    }catch(error){
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addComment(req,res){
    const { postId } = req.params;
    const { content } = req.body;
    try {
        if(!content){
            return res.status(400).json({message: 'Content required'});
        }

        const newComment = await prisma.comment.create({
            data:{
                content: content,
                postId: parseInt(postId),
                authorId: req.user.userId
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}

async function updateComment(req,res){
    const { postId, commentId } = req.params;
    const { content } = req.body;
    try {
        const existingComment = await prisma.comment.findUnique({
            where:{ id: parseInt(commentId), postId: parseInt(postId)}
        })

        if(!existingComment){
            return res.status(404).json({message: 'Comment not found'});
        }

        if (existingComment.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

         const updatedComment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { content }
        });

        res.status(200).json(updatedComment)
    } catch (error) {
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteComment(req,res){
    const { postId, commentId} = req.params;
    try {
        const existingComment = await prisma.comment.findUnique({
            where: {
                id: parseInt(commentId),
                postId: parseInt(postId)
            }
        });

        if(!existingComment){
            return res.status(404).json({message: 'Comment not found'});
        }

        await prisma.comment.delete({
            where:{ id: parseInt(commentId)}
        });

        res.status(200).json({message: 'Comment delete succesfully'});
    } catch (error) {
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });        
    }
}

module.exports = {
    getCommentsForPost,
    getCommentById,
    addComment,
    updateComment,
    deleteComment
}