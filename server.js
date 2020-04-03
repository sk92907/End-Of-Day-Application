const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  User = require('./models/User'),
  Leave = require('./models/Leave'),
  Report = require('./models/Report'),
  Update = require('./models/Update');

app.use(express.static(path.join(__dirname, './client/build')));

require('dotenv').config();
// Routes
const users = require('./routes/api/users'),
  empRoutes = require('./routes/employee/employee'),
  managerRoutes = require('./routes/manager/manager');

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://platypus:' +
      process.env.MONGOPW +
      '@cluster0-ftq3z.mongodb.net/company?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('Error', err.message);
  });

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/api/users', users);
app.use('/api/employee', empRoutes);
app.use('/api/manager', managerRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
