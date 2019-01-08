const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//takes directory you want to use for all your handlebar partials, absolute
hbs.registerPartials(__dirname + '/views/partials');
//set various express variations
//key value pair
//which view engine we'd like to use
//views is the default directory express uses for templates
app.set('view engine', 'hbs');

//how you register middleware
//url is what path
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
//middleware is executed in the order you call app.use

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//takes middleware function you want to use.
//static takes the absolute path
//dirname stores the path to your projects directory
app.use(express.static(__dirname + '/public'));
//name of the helper, function to run
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page',
  });
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: ['Biking', 'Cities'],
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// /bad -send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
