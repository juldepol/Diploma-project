var mongoose=require("mongoose");

var Message = new mongoose.Schema({
	author: String,
	content: String,
	time: {type: Date, default: Date.now}
});

module.exports=mongoose.model('Message', Message);
