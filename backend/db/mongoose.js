const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

// connect to database
const dbConnection = mongoose.connect(process.env.MONGO_URI)


module.exports = dbConnection;