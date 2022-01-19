import discord
import os
from dotenv import load_dotenv
from discord.ext import commands
from datetime import datetime

load_dotenv()
intents = discord.Intents().default()
intents.members = True
client = discord.Client(intents=intents)
token = os.environ.get("DISCORD_TOKEN")
GUILD_ID = 927693513448104006
CHANNEL_ID = 927693513448104009 # general in Bot Playground


async def dm_user(uid, msg):
    user = await client.fetch_user(uid)
    await user.send(msg)

def user_exists(uid):
	guild = client.get_guild(GUILD_ID)
	return bool(guild.get_member(uid))

@client.event
async def on_message(msg):
	if msg.channel.id == CHANNEL_ID and msg.content.startswith('!dm '):
		words = msg.content.split(' ')
		uid = words[1][3:-1]
		msg_content = ' '.join(words[2:])
		if user_exists(int(uid)):
			await dm_user(uid, msg_content)

@client.event
async def on_ready():
	print("Logged in")

client.run(token)


