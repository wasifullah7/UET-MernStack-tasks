let {Comment} = require('../models/Comment');
let createComment = async (req, res) => {
    try{
        let {id} = req.params;
        const {username, content} = req.body;
        let comment = new Comment({
            blogId: id,
            username: username,
            content: content})
        await comment.save();
        res.status(201).json({ message: 'Comment created successfully', comment });
    }
    catch(error){
        console.error("Error creating comment:", error);
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

let displayComments = async (req, res) => {
    try {
        let {id} = req.params;
        const comments = await Comment.find({ blogId: id });

        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error displaying comments', error: error.message });
    }
}
let displayComment = async (req, res) => {
    //console.log("Displaying comment with ID:", req.params.commentId, "for blog post with ID:", req.params.id);
    try{
        let {id, commentId} = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if(comment.blogId.toString() !== id) {
            return res.status(404).json({ message: 'Comment does not belong to this blog post' });
        }
        res.status(200).json(comment);

    }catch(error){
        res.status(500).json({ message: 'Error displaying comment', error: error.message });
    }
}

module.exports = { createComment, displayComments, displayComment };