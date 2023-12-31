const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User  = require('../models/user');



//Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
async function(req,email,password,done){

try{
const user = await User.findOne({email:email});
if(!user || user.password!= password){
    // console.log(' invalid username/password');
    req.flash('error', 'Invalid Username/Password');
return done(null,false);
}
return done(null,user);
}catch(err){
// console.log(err);
req.flash('error',err);
return done(err);
}
}))




//Serializing the user to decide which key is to be kept
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//deserialize the user from the key in the cookies
passport.deserializeUser(async function(id,done){
// User.findById(id,function(err,user){
// if(err){
//     console.log('error in fiding user--->passport');
//     return done(err);
// }
// return done(null,user);
// })
// })
try{
const user = await User.findById(id);
return done(null,user);
}catch(err){
    console.log('error in fiding user--->passport');
        return done(err);
}
})

//check is the user is Authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the request to the next function(controller's action);
if(req.isAuthenticated()){
return next();
}

//if the user is not signed in
return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
if(req.isAuthenticated()){
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
}
next();
}


module.exports = passport;