var mongoose = require('mongoose'),

	Schema = mongoose.Schema,

	Channel = new Schema({	
		"name": { type: String },
		"url": { type: String }
	});


module.exports = mongoose.model('Channel', Channel);
