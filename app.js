var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const Customer = require('./models/customer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGODB_URI)

app.post('/subscription-created', async (req, res, next) => {
  const customerData = req.body;
  const customerEmail = customerData.email
  const customerTags = customerData.tags
  const customerFirstName = customerData.first_name
  const customerLastName = customerData.last_name
  const customerLTV = customerData.total_spent

  // read tags values
  
  if (customerTags.includes("active_subscriber")){
     customerStatus = true
  } else {
     customerStatus = false
  }

  if (customerTags.includes("Style Preference: More Bold")){
    customerPref = "More Bold"
  } else if (customerTags.includes("Style Preference: Bold 4")) {
    customerPref = "Bold 4"
  } else if (customerTags.includes("Style Preference: Bold 3")){
    customerPref = "Bold 3"
  } else if (customerTags.includes("Style Preference: Bold 2")){
    customerPref = "Bold 2"
  } else if (customerTags.includes("Style Preference: Less Bold")){
    customerPref = "Less Bold"
  } else if (customerTags.includes("Style Preference: Any")){
    customerPref = "Any"
  } else {
    customerPref = "none"
  }

  try {
    const customer = new Customer({
      email: customerEmail,
      first_name: customerFirstName,
      last_name: customerLastName,
      ltv: customerLTV,
      activated: customerStatus,
      preference: customerPref
    })

    const result = await customer.save();

  } catch (err) {
    console.log(err);
  }
res.end();
  
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
