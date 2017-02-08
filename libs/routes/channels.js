var express = require('express');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');
var Channel = require(libs + 'model/channel');
var outData = require(libs + 'handle/data');



router.get('/', function(req, res) {
	Channel.find({}, function (err, allChannels) {

		if(!allChannels) {
			res.statusCode = 404;
			res.end();
		} else if (!err) {
			return res.json(outData.channelSetToJson(allChannels));
		} else {
			res.statusCode = 500;
			res.end();
			log.error('Internal error(%d): %s',res.statusCode,err.message);
		}
	});
});

router.get('/:id', function(req, res) {


	Channel.findById(req.params.id, function (err, oneChannel) {

		if(!oneChannel) {
			res.statusCode = 404;
			res.end();
		} else if (!err) {
			return res.json(outData.channelSingleToJson(oneChannel));
		} else {
			res.statusCode = 500;
			res.end();
			log.error('Internal error(%d): %s',res.statusCode,err.message);
		}
	});

});

router.post('/', function(req, res) {
	var attributes = req.body.data.attributes;
	var newChannel = new Channel({
						"name": attributes.name,
						"url": attributes.url,
					});

	newChannel.save(function (err,savedChannel) {
		if (!err) {
			res.statusCode = 200;
			res.json(outData.channelToJson(savedChannel));
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.end();
			} else {
				res.statusCode = 500;
				res.end();
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});

});


router.delete('/:id', function(req, res) {

	Channel.findById(req.params.id, function (err, channelToDelete) {

		if(!channelToDelete) {
			res.statusCode = 404;
			res.end();
		} else if (!err) {
			channelToDelete.remove({},function(err) {
				if(!err){
					res.statusCode = 204;
					res.end();
				} else {
					res.statusCode = 500;
					res.end();
					log.error('Internal error(%d): %s', res.statusCode, err.message);
				}
			});
		} else {
			res.statusCode = 500;
			res.end();
			log.error('Internal error(%d): %s',res.statusCode,err.message);
		}
	});
});

module.exports = router;
