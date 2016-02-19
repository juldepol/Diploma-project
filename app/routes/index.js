var path=process.cwd();//returns current working directory

module.exports=function (app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }
    
    app.route('/').get(isLoggedIn, function (req, res){
        //res.sendFile(path+'/static/index.html');
        res.render(path+'/static/index.ejs');
    });
    
    app.route('/login').get(function (req, res){
        res.sendFile(path+'/static/login.html');
    });
    
    app.route('/logout').get(function (req, res){
        req.logout();
        res.redirect('/login');
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
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    
    app.route('/auth/vkontakte')
        .get(passport.authenticate('vkontakte'));
    
    app.route('/auth/vkontakte/callback')
        .get(passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    
    app.route('/auth/google')
        .get(passport.authenticate('google', {scope: ['profile', 'email']}));
    
    app.route('/auth/google/callback')
        .get(passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    
}