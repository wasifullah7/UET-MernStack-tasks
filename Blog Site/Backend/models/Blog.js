let mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});
let Blog = mongoose.model('Blog', blogSchema);

// let commentSchema = new mongoose.Schema({
//     blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
//     content: { type: String, required: true },
// });
// let Comment = mongoose.model('Comment', commentSchema);

// module.exports = {Blog, Comment};
module.exports = {Blog} ;