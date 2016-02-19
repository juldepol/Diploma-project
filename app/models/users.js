var mongoose=require("mongoose");
//kinda class
var User = new mongoose.Schema({
	github: {
		id: String,
		displayName: String,
		username: String
	},
	vkontakte: {
		id: String,
		displayName: String,
		username: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		displayName: String
	}
});
//compiling a 'User' model using the userSchema as the structure
module.exports=mongoose.model('User', User);