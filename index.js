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
const MongoStore = require('connect-mongo')(session);

// const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//   /* Options */
//   src: './assets/scss',
//  dest: './assets/css',
//  debug: true,
//  outputStyle: 'extended',
// prefix:'/css'
// }));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'))

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


app.use('/',require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})