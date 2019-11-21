module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Edit Emoji",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Emoji Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const emoji = ['You cheater!', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `${emoji[parseInt(data.storage)]}`;
},

//---------------------------------------------------------------------
	 // DBM Mods Manager Variables (Optional but nice to have!)
	 //
	 // These are variables that DBM Mods Manager uses to show information
	 // about the mods for people to see in the list.
	 //---------------------------------------------------------------------

	 // Who made the mod (If not set, defaults to "DBM Mods")
	 author: "Quinten & MrGold",

	 // The version of the mod (Defaults to 1.0.0)
	 version: "1.9", //Added in 1.9

	 // A short description to show on the mod line for this mod (Must be on a single line)
	 short_description: "Edits a specific Emoji",

	 // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
	 depends_on_mods: [
	 {name:'WrexMods',path:'aaa_wrexmods_dependencies_MOD.js'}
	 ],
	 
	 //---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["storage", "varName", "emojiName"],

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
		<p>
			<u>Mod Info:</u><br>
			Made by <b>Quinten</b> & <b>MrGold</b>!</p>
		</p>
	</div><br>
<div>
	<div style="float: left; width: 35%;">
		Source Emoji:<br>
		<select id="storage" class="round" onchange="glob.refreshVariableList(this)">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	Emoji Name:<br>
	<input id="emojiName" placeholder="Leave blank to not edit!" class="round" type="text">
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;
	
	glob.emojiChange(document.getElementById('storage'));
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const emojiData = {};
	if(data.emojiName) {
		emojiData.name = this.evalMessage(data.emojiName, cache);
	}
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	var WrexMods = this.getWrexMods();
	const emoji = WrexMods.getEmoji(storage, varName, cache);
	if(Array.isArray(emoji)) {
		this.callListFunc(emoji, 'edit', [emojiData]).then(function() {
			this.callNextAction(cache);
		}.bind(this));
	} else if(emoji && emoji.edit) {
		emoji.edit(emojiData).then(function(emoji) {
			this.callNextAction(cache);
		}.bind(this)).catch(this.displayError.bind(this, data, cache));
	} else {
		this.callNextAction(cache);
	}
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module
