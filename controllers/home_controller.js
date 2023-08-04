// controller is a set of actions
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('twef',737373);
return res.render('home',{
    title:"Home"
});
}