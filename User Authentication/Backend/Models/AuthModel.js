const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const UserModel = mongoose.model('User', schema);
module.exports = UserModel;