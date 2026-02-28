const {Blog} = require('../models/Blog');
let createBlog =  async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
} 

let displayBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
}

let displayBlog = async (req, res) => {
    try{
        let blogid = req.params.id;
        let blog = await Blog.findOne({_id:blogid});
        if(!blog){
            return res.status(404).json({ message: 'Blog not found' });
        }
        else{
            res.status(200).json({message: 'Blog fetched successfully', blog: blog});
        }
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching blog', error: error.message });
    }
};
module.exports = { createBlog, displayBlogs, displayBlog};