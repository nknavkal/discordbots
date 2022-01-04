// Run dotenv
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const BOT_ID = '927669142885109781';
var BANNED_ID = '670671223390470154'; //HAT 
// var BANNED_ID = '831742807445078027'; //TEST (ME)

const bot = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', (msg) => {
	const content = msg.content;

	if (content.substring(0, 1) == '!') {
		var words = content.substring(1).split(' ');
		var cmd = words[0];
		var target = words[1];

		if (idFromMention(target) === BOT_ID) {
			//cannot target the bot
			haze('<@' + msg.author.id + '>', msg);

		} else {
			if (cmd === "haze") {

				if (msg.author.id === BANNED_ID) {
					//cant haze if banned
					haze('<@' + msg.author.id + '>', msg);

				} else {
					haze(target, msg);
				}

			} else if (cmd === 'releaseme' && msg.author.id === BANNED_ID) {
				msg.reply('<@' + BANNED_ID + '> has been released from the ban.')
				BANNED_ID = '0';

			} else if (cmd === 'ban' && BANNED_ID === '0') {
				// console.log(idFromMention(target), BOT_ID)
				BANNED_ID = idFromMention(target);
				msg.reply('<@' + BANNED_ID + '> is now banned.')
			};
		};
	};
});

function haze(hazee, msg) {
	var insultBank = [
	`ay shut up ${hazee}`,
	`${hazee} fuck off`,
	`you are trash, ${hazee}`,
	`there has literally never existed a goofier individual than ${hazee}`,
	`${hazee} is a clown`,
	`yo boot ${hazee} immediately`,
	`behold, ${hazee}! the epitome of foolishness`,
	`${hazee} ur an embarrassment`,
	`${hazee} get a life, pal!`,
	`zara doka vapar ${hazee}`
	];
	msg.reply(insultBank[Math.floor(Math.random() * insultBank.length)]);
};

function idFromMention(mention) {
	if (!mention) {
		return mention 
	};

	return mention.substring(3, mention.length-1)
}

bot.login(process.env.DISCORD_TOKEN);