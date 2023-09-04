const Post = require('../models/post'); 
const Comment = require('../models/comment');
module.exports.create = async  function(req,res){
    try{
    // console.log("hello");
    // console.log(req.body);
await Post.create({
    content: req.body.content,
    user:req.user._id
}
);
    }catch(err){
        console.log(err);
        return;
    }
    return res.redirect('back');
    }

// in complete
    module.exports.destroy = async function(req,res){
        try{
     const post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
           await post.deleteOne();
           await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
      
   
    } catch(err){
        return res.redirect('back');
    }
}