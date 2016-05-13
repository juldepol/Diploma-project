var mongoose=require("mongoose");

var User = new mongoose.Schema({
	github: {
		id: String,
		displayName: String,
		avatar:  String
	},
	vkontakte: {
		id: String,
		displayName: String,
		avatar:  String
	},
	google: {
		id: String,
		displayName: String,
		avatar:  String
	}
});
//compiling a 'User' model using the userSchema as the structure
module.exports=mongoose.model('User', User);