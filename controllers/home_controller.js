// controller is a set of actions
module.exports.home = function(req,res){
return res.render('home',{
    title:"Home"
});
}