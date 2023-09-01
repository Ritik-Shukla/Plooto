const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('users_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res){

if(req.isAuthenticated()){
   return  res.redirect('/users/profile');
}

    return res.render('user_sign_up',{
        title:'SignUp'
    })
}

module.exports.signIn = function(req,res){
console.log(" signin");
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'SignIn'
    })
}

// creating sign up
module.exports.create =  async function(req,res){
try{
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
      }
let user = await User.findOne({email:req.body.email});
if(!user){
        const newUser = await User.create(req.body);
        return res.redirect("/users/sign-in");
}else{
    return res.redirect('back');
}
}catch (err) {
    console.log(err);
    return;
  }
}





module.exports.createSession = function(req,res){
    // todo later
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // req.logout();
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
  
})
}


  