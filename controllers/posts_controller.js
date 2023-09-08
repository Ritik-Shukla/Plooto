const Post = require('../models/post'); 
const Comment = require('../models/comment');
module.exports.create = async  function(req,res){
    try{
let post = await Post.create({
    content: req.body.content,
    user:req.user._id
}
);
if(req.xhr){
    return res.status(200).json({
        data:{
            post:post
        },
        message:"Post created!"
    })
}
    }catch(err){
        // console.log(err);
        req.flash('error',err);
        return res.redirect('back');
    }
    req.flash('success','Post published');
    return res.redirect('back');
    }

// in complete
    module.exports.destroy = async function(req,res){
        try{
     const post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
           await post.deleteOne();
           await Comment.deleteMany({post:req.params.id});
           if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted"
            });
           }
           req.flash('success','Post deleted');
                return res.redirect('back');
            
        }else{
            req.flash('success','You can not Delete this post');
            return res.redirect('back');
        }
      
   
    } catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}