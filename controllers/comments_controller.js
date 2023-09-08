const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req,res){
    try{
const post = await Post.findById(req.body.post);
if(post){
const comment = await Comment.create({
    content:req.body.content,
    post:req.body.post,
    user:req.user._id
})
post.comments.push(comment);
post.save();
req.flash('success','Comment added');
res.redirect('/');
}else{
    // console.log("error in creating a comment");
    req.flash('error','Comment not added');
    return res.redirect('/');
}
}catch(err){
    req.flash('error',err);
    return res.redirect('/');
}
}

module.exports.destroy = async function(req,res){ 
    try{
    const comment = await Comment.findById(req.params.id);
    if(comment.user==req.user.id){
        const postId = comment.post;
        await Comment.deleteOne({ _id: req.params.id });
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            // Redirect to the previous page (assuming you have a 'back' route or URL)
            req.flash('success','Comment deleted');
            res.redirect('back');
    }else{
        req.flash('error','Comment not deleted');
        res.redirect('back');
    }
}catch(err){
req.flash('error',err);
res.redirect('back');
}
}