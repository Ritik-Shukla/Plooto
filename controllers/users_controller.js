const User = require('../models/user');

module.exports.profile = async  function(req, res){
    const user = await User.findById(req.params.id);
    return res.render('users_profile', {
        title: 'User Profile',
        profile_user:user
    })
}
module.exports.update = async  function(req,res){
//     if(req.user.id == req.params.id){
//     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
// return res.redirect('back');
//     })
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
try {
    // Check if the user is authorized
    if (req.user.id === req.params.id) {
      // Use async/await to update the user information
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      // Redirect back to the previous page
      return res.redirect('back');
    } else {
      // Unauthorized
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    // Handle any errors that may occur during the update process
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
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
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // req.logout();
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
  
})
}


  