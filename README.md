# Biscord-Dot

Biscord Dot is an all inclusive bot, with MySQL database support, passwords, music, a web panel, and much more!

***WARNING*** **THIS BOT DOES CHAT LOGGING** ***WARNING***

**Please have MySQL already installed**

Follow the install instructions below, to get started!

1. sudo apt-get install -y git

2. mkdir -p /home/biscord; cd /home/biscord

2. git clone https://github.com/plombly/Biscord-Dot.git

3. mysql -u root -p root < setupdb.sql

4. chmod -R 755 /home/biscord; chown -R root: /home/biscord

5. input your credentials into ./data/settings.json

6. set the database passwords in ./data/commands.json (there are about 10 instanses (fill dbpasshere) this can be changed at any time)

7. node bot.js
