'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/users');
var configAuth = require('./auth');
var fs=require("fs");

function avatarGenerator(){
	var array=["elephant.png", "giraffe.png", "hippo.png","monkey.png","panda.png","parrot.png","penguin.png","pig.png","rabbit.png","snake.png"];
	return array[Math.floor((Math.random() * array.length))];
}


module.exports = function (passport) {
	/*Passport will maintain persistent login sessions. 
	In order for persistent sessions to work, the authenticated 
	user must be serialized to the session, and deserialized 
	when subsequent requests are made.*/
	/*???
	user-
	id-
	done-
	*/
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	//Passport uses the concept of strategies to authenticate requests
	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	}, 
	/*???
	token-
	refreshToken-
	profile-
	done-
	verify callback
	*/
	function (token, refreshToken, profile, done) {
		/*???
		process.nextTick() - runs before any additional I/O events 
		fire in subsequent ticks of the event loop
		*/
		process.nextTick(function () {
			/*
			
			*/
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				//if user is already registered
				if (user) {//???
					return done(null, user);
				} else {//if not
					var newUser = new User();//create new user profile
					newUser.github.id = profile.id;
					newUser.github.displayName = profile.username;
					newUser.github.avatar = avatarGenerator();
					//Saves this document (user)
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	//
	passport.use(new VKontakteStrategy({
		clientID: configAuth.vkontakteAuth.clientID,
		clientSecret: configAuth.vkontakteAuth.clientSecret,
		callbackURL: configAuth.vkontakteAuth.callbackURL
	}, function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'vkontakte.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.vkontakte.id = profile.id;
					newUser.vkontakte.displayName = profile.displayName;
					newUser.vkontakte.avatar = avatarGenerator();
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	}, function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'google.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.google.id = profile.id;
					newUser.google.displayName = profile.displayName;
					newUser.google.avatar = avatarGenerator();
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
};