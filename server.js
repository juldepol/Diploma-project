var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var routes = require("./app/routes/index.js")//???

var app = express();
require("dotenv").load();//load environment variables
require('./app/config/passport')(passport);//???

mongoose.connect(process.env.MONGO_URI);//connecting to database

app.set('view engine', 'ejs');

//mounting middleware for static files
app.use('/static', express.static(process.cwd()+'/static'));

//???
var sessionMiddleware = session({
    secret: 'wat',//for signing session ID cookie
    resave: false,
    saveUninitialized: true
});
app.use(sessionMiddleware);
app.use(passport.initialize());//???
app.use(passport.session());//???

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log("Listening on port "+port);
});

var io = require('socket.io').listen(server);
io.use(function(socket, next){
    sessionMiddleware(socket.request, {}, next);
});
routes(app, passport, io);//routing, authentication and chat

