const Post  = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('twef',737373);
//     const posts = await Post.find({});
//     console.log(posts[0]);
//     if(posts){
// return res.render('home',{
//     title:"Home",
//     posts:posts

// });
const posts = await Post.find({}).populate('user').populate({
    path:'comments',
    populate:{
        path:'user'
    }
});
// console.log(posts);
const users = await User.find({});
return res.render('home',{
    title: "Plooto | Home",
    posts:posts,
    all_users:users
})
    }
