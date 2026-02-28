const UserModel = require('../Models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const user = await UserModel.findOne({ email });
    if(user){
        return res.status(409).json({ message: 'User already exists', success: false });
    }
    const usermodel = new UserModel({
        username,
        email,
        password
    });

    usermodel.password = await bcrypt.hash(password, 10);

    await usermodel.save()
        .then(() => {
            res.status(201).json({ message: 'User created successfully', success: true});
        })
        .catch(err => {
            res.status(400).json({ message: 'User Not Created', sucess:false, error: err.message });
        });
};

const login = async (req, res) => {
    try {
    const { email, password} = req.body;

    const errorMsg = "Authentication failed: Email or Password is Incorrect.";
    const user = await UserModel.findOne({ email });
    if(!user){
        return res.status(403).json({ message: errorMsg, success: false });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
            res.status(403).json({ message: errorMsg, success: false});
    };
    
    const jwttoken = jwt.sign(
        {
        email: user.email, _id: user._id }, 
        process.env.JWT_SECRET, {expiresIn: '24h'            
        });
    
    res.status(200).json({
        message: 'Login successful',
        token: jwttoken,
        success: true,
        user: {
            username: user.username,
            email: user.email
        }
    });
} catch (error) {
    res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: error.message
    });
}
    
};

module.exports = {signup, login};