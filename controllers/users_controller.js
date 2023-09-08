const User = require('../models/user');
const fs = require('fs');
const path = require('path'); 

module.exports.profile = async  function(req, res){
    const user = await User.findById(req.params.id);
    return res.render('users_profile', {
        title: 'User Profile',
        profile_user:user
    })
}

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      // Assuming 'uploadedAvatar' is a middleware or function for handling avatar uploads using Multer.
      User.uploadedAvatar(req, res, async function (err) {
        if (err) {
          console.log('*****Multer Error: ', err);
          req.flash('error', 'Avatar upload error'); // Flash an error message if avatar upload fails.
        }

        // Update user data
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {

if(user.avatar){
  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
}



          user.avatar = User.avatarPath + '/' + req.file.filename;
        }

        // Save the updated user data
        await user.save();

        return res.redirect('back');
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Internal Server Error');
      return res.status(500).send('Internal Server Error');
    }
  } else {
    req.flash('error', 'Unauthorized');
    return res.status(401).send('Unauthorized');
  }
};



module.exports.signUp = function(req,res){

if(req.isAuthenticated()){
   return  res.redirect('/users/profile');
}

    return res.render('user_sign_up',{
        title:'SignUp'
    })
}

module.exports.signIn = function(req,res){
// console.log(" signin");
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // req.logout();
    req.flash('success','You have logged out!');
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
  
})
}


  