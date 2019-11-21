module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Check Global Data",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Deprecated",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const results = ["Continue Actions", "Stop Action Sequence", "Jump To Action", "Jump Forward Actions"];
	return `If True: ${results[parseInt(data.iftrue)]} ~ If False: ${results[parseInt(data.iffalse)]}`;
},

//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

// Who made the mod (If not set, defaults to "DBM Mods")
author: "MrGold",

// The version of the mod (Defaults to 1.0.0)
version: "1.9.5", //Added in 1.9.5

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Check if a Global Data Value meets the conditions",

// If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["dataName", "comparison", "value", "iftrue", "iftrueVal", "iffalse", "iffalseVal"],

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
<div style="padding-top: 8px;">
	<div style="float: left; width: 50%;">
		Data Name:<br>
		<input id="dataName" class="round" type="text">
	</div>
	<div style="float: left; width: 45%;">
		Comparison Type:<br>
		<select id="comparison" class="round">
			<option value="0">Exists</option>
			<option value="1" selected>Equals</option>
			<option value="2">Equals Exactly</option>
			<option value="3">Less Than</option>
			<option value="4">Greater Than</option>
			<option value="5">Includes</option>
			<option value="6">Matches Regex</option>
		</select>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	Value to Compare to:<br>
	<input id="value" class="round" type="text" name="is-eval">
</div>
<div style="padding-top: 16px;">
	${data.conditions[0]}
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

	glob.onChangeTrue(document.getElementById('iftrue'));
	glob.onChangeFalse(document.getElementById('iffalse'));
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

	let result = false;

	const dataName = this.evalMessage(data.dataName, cache);
	const compare = parseInt(data.comparison);

	const fs = require("fs");
	const path = require("path");

	const filePath = path.join(process.cwd(), "data", "globals.json");

	if(!fs.existsSync(filePath)) {
		console.log("ERROR: Globals JSON file does not exist!");
		this.callNextAction(cache);
		return;
	}

	const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	const val1 = obj[dataName];

	let val2 = this.evalMessage(data.value, cache);
	if(compare !== 6) val2 = this.eval(val2, cache);
	if(val2 === false) val2 = this.evalMessage(data.value, cache);
	
	switch(compare) {
		case 0:
			result = Boolean(val1 !== undefined);
			break;
		case 1:
			result = Boolean(val1 == val2);
			break;
		case 2:
			result = Boolean(val1 === val2);
			break;
		case 3:
			result = Boolean(val1 < val2);
			break;
		case 4:
			result = Boolean(val1 > val2);
			break;
		case 5:
			if(typeof(val1.includes) === 'function') {
				result = Boolean(val1.includes(val2));
			}
			break;
		case 6:
			result = Boolean(val1.match(new RegExp('^' + val2 + '$', 'i')));
			break;
	}
	this.executeResults(result, data, cache);
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