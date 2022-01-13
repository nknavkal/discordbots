import discord
import os
from dotenv import load_dotenv
from discord.ext import commands
from datetime import datetime

load_dotenv()
intents = discord.Intents().default()
client = discord.Client(intents=intents)
token = os.environ.get("DISCORD_TOKEN")
# client.run(.TOKEN)

print(token)