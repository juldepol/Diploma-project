var path=process.cwd();//returns current working directory
var user = require('../models/users');

module.exports=function (app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }
    
    function userData(userRequest){
        var github=userRequest.github;
        var vkontakte=userRequest.vkontakte;
        var google=userRequest.google;
        if (github.toString()!=='{}'){
            return github;
        } else if  (vkontakte.toString()!=='{}'){
            return vkontakte;
        } else if (google.toString()!=='{}') {
            return google;
        } else {
            return "If you see it, the person who wrote this server is dumb like shit!!!";
        }
    }
    
    app.route('/').get(isLoggedIn, function (req, res){
         res.render(path+'/static/news.ejs',{displayName: userData(req.user).displayName});
    });
     
    app.route('/news').get(isLoggedIn, function (req, res){
        res.render(path+'/static/news.ejs',{displayName: userData(req.user).displayName, avatar: userData(req.user).avatar});
    });
    
    app.route('/games').get(isLoggedIn, function (req, res){
        res.render(path+'/static/games.ejs',{displayName: userData(req.user).displayName, avatar: userData(req.user).avatar});
    });

    app.route('/about').get(isLoggedIn, function (req, res){
        res.render(path+'/static/about.ejs',{displayName: userData(req.user).displayName, avatar: userData(req.user).avatar});
    });
    
    app.route('/login').get(function (req, res){
        res.sendFile(path+'/static/login.html');
    });
    
    app.route('/logout').get(function (req, res){
        req.logout();
        res.redirect('/login');
    });
    
    app.route('/delete').get(function (req, res){
        user.find({_id: req.user._id }).remove( 
            function(err) {
                if (err) {
                    res.json(err);
                } else {
                    console.log("-1");
                    res.sendFile(path+'/static/delete.html');
                }
            }  
        ).exec();
    });
    
    app.route('/api/:id').get(isLoggedIn, function(req, res) {
        if(JSON.stringify(req.user.github)===JSON.stringify({}) && JSON.stringify(req.user.google)===JSON.stringify({})){
            res.json(req.user.vkontakte);
        }
        else if(JSON.stringify(req.user.vkontakte)===JSON.stringify({}) && JSON.stringify(req.user.google)===JSON.stringify({})){
            res.json(req.user.github);
        }
        else if(JSON.stringify(req.user.github)===JSON.stringify({}) && JSON.stringify(req.user.vkontakte)===JSON.stringify({})){
            res.json(req.user.google);
        }
    });
    
    app.route('/auth/github')
        .get(passport.authenticate('github'));
    
    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/news',
            failureRedirect: '/login'
        }));
    
    app.route('/auth/vkontakte')
        .get(passport.authenticate('vkontakte'));
    
    app.route('/auth/vkontakte/callback')
        .get(passport.authenticate('vkontakte', {
            successRedirect: '/news',
            failureRedirect: '/login'
        }));
    
    app.route('/auth/google')
        .get(passport.authenticate('google', {scope: ['profile', 'email']}));
    
    app.route('/auth/google/callback')
        .get(passport.authenticate('google', {
            successRedirect: '/news',
            failureRedirect: '/login'
        }));
}