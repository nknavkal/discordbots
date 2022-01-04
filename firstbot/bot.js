// Run dotenv
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const BOT_ID = '927705596952727622';
var pinger_ID;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {

  	if (msg.content === 'ping') {
  		msg.reply('pong');
  		pinger_ID = msg.author.id;
  		
  	} else if (msg.content === 'who pinged?') {
  		msg.reply('<@' + pinger_ID + '> did.');
  	}
});

client.login(process.env.DISCORD_TOKEN);