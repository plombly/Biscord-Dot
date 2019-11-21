module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Restart Bot",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Bot Client Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `Restarts ${data.filename}`
},

//---------------------------------------------------------------------
	 // DBM Mods Manager Variables (Optional but nice to have!)
	 //
	 // These are variables that DBM Mods Manager uses to show information
	 // about the mods for people to see in the list.
	 //---------------------------------------------------------------------

	 // Who made the mod (If not set, defaults to "DBM Mods")
	 author: "MrGold, NetLuis & ZockerNico",

	 // The version of the mod (Defaults to 1.0.0)
	 version: "1.9.5", //Added in 1.9.3

	 // A short description to show on the mod line for this mod (Must be on a single line)
	 short_description: "Restarts the bot",

	 // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
     

	 //---------------------------------------------------------------------


//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

//variableStorage: function(data, varType) {},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["filename"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<p><u>Mod Info:</u><br>
	Created by MrGold<br> Fixed by NetLuis<br> Modified by ZockerNico</p>
</div><br>
<div style="float: left; width: 105%;">
	Your main bot file:<br>
	<input id="filename" class="round" type="text" value="bot.js"><br>
</div>
<div><br>
	<p><u>NOTE:</u><br>
		Any action that is below this mod will not be executed!</p>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const filename = this.evalMessage(data.filename, cache);
	this.getDBM().Bot.bot.destroy().then(console.log(`Restarting ${filename}...`))
	const child = require('child_process')
	child.execSync(`node ${filename}`,{cwd: require('path').dirname(process.argv[1]),stdio:[0,1,2]}).catch(e => console.log('An error in Restart Bot MOD: ' + e))
	//very long code lul
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {}

}; // End of module