const express = require("express");
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'))
// Make the upload path available to the browser 
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router 

app.set('view engine','ejs')
app.set('views', './views')

// MongoStore is used to store the session cookie in the db
app.use(session({
  name:'Plooto',
  secret:'blahsomething',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: new MongoStore(
    {
    mongooseConnection: db,
    autoRemove: 'disabled'
  },
  function(err){
    console.log(err || 'connect-mongodb settup ok');
  }
)
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})