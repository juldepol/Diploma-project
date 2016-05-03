var User=require("../models/users.js");
module.exports=function(router) {
    router.get('/users/:id', function(req, res){
        User.findOne({_id: req.params.id}, function(err, data) {
            if (err) {
                return err;
            } else {
                res.json(data);
            }
        });
    });
}