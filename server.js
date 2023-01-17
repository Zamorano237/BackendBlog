/** @format */

require('dotenv').config();
require('express-async-errors');
const express = require('express');
const { auth } = require('express-openid-connect');
const auth0Config = require('./config/auth0Config');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

// connect to the dataBase
connectDB();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(auth(auth0Config));
app.use('/', require('./routes/root'));
// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/upload', express.static(path.join(__dirname, 'files')));

//routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/upload', require('./routes/upload'));

// Gestion des erreurs
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

//manage mongoose connection
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
