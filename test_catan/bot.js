var discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');

//logger config

logger.remove(logger.tramsports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

//init bot

var bot = new Discord.Client({
	token: auth.token,
	autorun: true,
});

bot.on('ready', function(evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {

// Our bot needs to know if it will execute a command

// It will listen for messages that will start with `!`

if (message.substring(0, 1) == '!') {

    var args = message.substring(1).split(' ');

    var haze = args[0];

    if (haze == "haze") {

	    var to_be_hazed = getUsersFromMention(args.slice(1));

	    if (message.author.id == "670671223390470154") {

	    	bot.sendMessage({

	            to: channelID,

	            message: "Oy <@" + message.author.id + "> shut up"

	        });

	    } else {

	    	for (hazee in to_be_hazed) {

		        bot.sendMessage({

		            to: channelID,

		            message: "Oy <@" + hazee + "> shut up"

		        });
		    };
	    };

    };
};

});

function getUsersFromMention(mentions) {
	
	if (!mention) return;

	var ids = [];

	for (mention in mentions) {

		if (mention.startsWith('<@') && mention.endsWith('>')) {
			
			mention = mention.slice(2, -1);
			ids.push(mention);
		};
	};
};
