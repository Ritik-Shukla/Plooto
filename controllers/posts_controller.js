const Post = require('../models/post'); 
module.exports.create = async function(req,res){
    try{
    console.log("hello");
    console.log(req.body);
Post.create({
    content: req.body.content,
    user:req.user._id
}
)
 
}catch(err){
    
        console.log(err);
        
}
return res.redirect('back');
}