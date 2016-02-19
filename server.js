var express=require("express");
var mongoose=require("mongoose");
var passport=require("passport");
var session=require("express-session");
var routes=require("./app/routes/index.js")//???

var app=express();
require("dotenv").load();//load environment variables
require('./app/config/passport')(passport);//???

//connecting to database
mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');

//???
app.use('/controllers', express.static(process.cwd()+'/app/controllers'));
//mounting middleware for static files
app.use('/static', express.static(process.cwd()+'/static'));
//???
app.use('/common', express.static(process.cwd()+'/app/common'));

//???
app.use(session({
    secret: 'wat',//for signing session ID cookie
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());//???
app.use(passport.session());//???

routes(app, passport);//???


var port=process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Listening on port "+port);
});