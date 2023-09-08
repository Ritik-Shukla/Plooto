const passport = require('passport');
const JWTStratey = require('passport-jwt').Strategy;
// help us to extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');

let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Plooto',

}


passport.use(new JWTStratey(opts,async function(jwtPayLoad,done){
    // User.findById(jwtPayLoad._id,function(err,user){
    //     if(err){
    //         console.log('Error in finding user from JWT');
    //         return;
    //     }
    //     if(user){
    //         return done(null,user);
    //     }else{
    //         return done(null,false);
    //     }
    // })
    try{
    const user = await User.findById(jwtPayLoad._id);
    if(user){
        return done(null,user);
    }else{
        return done(null,false);
    }
}catch(err){
    console.log('Error in finding user from JWT');
                return;
}
}));

module.exports = passport;