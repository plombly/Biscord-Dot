# Biscord-Dot

Biscord Dot is an all inclusive bot, with MySQL database support, passwords, music, a web panel, and much more!

/***WARNING***/ **THIS BOT DOES CHAT LOGGING** /***WARNING***/

**Please have MySQL already installed**

Follow the install instructions below, to get started!

1. sudo apt-get install -y git node ffmpeg

2. mkdir -p /home/biscord; cd /home/biscord

2. git clone https://github.com/plombly/Biscord-Dot.git

3. mv Biscord-Dot/* ./

4. rm Biscord-Dot -r

5. mysql -u root -p < setupdb.sql

6. mysql -u biscord -p7zC%2Qbms7FN biscord < b_servers.sql

7. chmod -R 755 /home/biscord; chown -R root: /home/biscord

8. input your credentials into ./data/settings.json

9. (not required) set the database passwords in ./data/commands.json (Default MySQL password for the Biscord user is: 7zC%2Qbms7FN)(there are about 10 instanses (fill dbpasshere) this can be changed at any time)

10. node bot.js
