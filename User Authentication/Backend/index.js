const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/Authroutes');
const prouter = require('./Routes/Productroutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', router)
app.use("/products", prouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  })
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
