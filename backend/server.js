const express = require("express");
const { route } = require("./routes/notes");
const dotenv = require("dotenv").config();
const dbConnect = require('./db/mongoose')
const cors = require('cors')
// Route Definition
const noteRoutes = require("./routes/notes");
const userRoutes = require('./routes/user')

// Express app initialization
const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Route Use
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);


// Connect to Db
dbConnect.then(() => {
  // Listening for request
  app.listen(port, () => {
    console.log(`Listening on port ${port} and connected to MongoDB!!`);
  })
}).catch((error)=> {
    console.log(error)
})

const port = process.env.PORT || 3000;
