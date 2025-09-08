// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
ConnectDB();
app.use(cookieParser())
app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.listen(5000, () => console.log("Server started on port 5000"));