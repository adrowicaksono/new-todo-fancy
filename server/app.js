require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//mongoose
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.dbUser}:${process.env.dbPassword}@ds157187.mlab.com:57187/adrodb`, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongodb://ds157187.mlab.com:57187/adrodb--connect`)
});

//require routes
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')
const mailRouter = require('./routes/mail')

app.get('/', function(req,res){
  res.send('to-do api - adrowicaksono')
})
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/task', taskRouter)
app.use('/mail', mailRouter)


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
  res.json(err.message);
});

module.exports = app;
