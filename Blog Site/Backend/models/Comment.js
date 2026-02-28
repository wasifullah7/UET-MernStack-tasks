let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true }});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };