let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let router = require('./routes/blogRoutes');

require('dotenv').config();

let app = express();
app.use(express.json());
app.use(cors());
app.use("/blog/", router);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
        
        });
}).catch(err =>console.error('MongoDB connection error:', err));