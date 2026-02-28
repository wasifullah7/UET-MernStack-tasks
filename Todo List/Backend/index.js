let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const router = require('./routes/todoroutes');
require('dotenv').config();

let app = express();
app.use(express.json());
app.use(cors());
app.use('/todo/api/', router);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})
}).catch(err =>console.error('MongoDB connection error:', err));