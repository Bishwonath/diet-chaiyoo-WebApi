// const express= require("express")
// const connectDB=require("./config/db")
// const UserRouter = require("./routes/UserRoute");

// const AuthRouter = require("./routes/AuthRoute");




// const app=express();

// connectDB();


// app.use(express.json());




// app.use("/api/user",UserRouter );

// app.use("/api/auth",AuthRouter);

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`)
// })


const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const UserRouter = require('./routes/UserRoute');
const AuthRouter = require('./routes/AuthRoute');

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'frontend/pages' directory
app.use('/pages', express.static(path.join(__dirname, '/frontend/pages')));

// Define API routes
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

// Define a root route to serve the login page
app.get('/', (req, res) => {
  res.redirect('/pages/login.html'); // Redirect to login page
});

// Define the port to listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});