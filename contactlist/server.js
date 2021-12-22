const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const port = 8080;

mongoose.connect('mongodb://localhost/contactlist',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', () => {
  console.log('Data base connection has been made');
});

// Routing configurations
app.use('/api/contacts', require('./routes/contacts'));

app.listen(port, () => {
  console.log('application has been started in port ', port);
});