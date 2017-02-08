exports.channelToJson = function (channel) {
	return {data: {
		name: channel.name,
		url: channel.url,
		id: channel._id,
		type: "channels"
	}};	
};

exports.channelSetToJson = function (channels) {
	var newChannels = channels.map(function(item){
		return {
			name: item.name,
			url: item.url,
			id: item._id,
			type: "channels"
		};
	});
	return {data: newChannels};	
};

exports.channelSingleToJson = function (channel) {
	return {data:
				{attributes:{
					name: channel.name,
					url: channel.url
				},
				id: channel._id,
				type: "channels"
			}
		};	
};
