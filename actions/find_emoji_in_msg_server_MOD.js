module.exports = {

	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
	
	name: "Find Custom Emoji in Server",
	
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
		const info = ['Emoji ID', 'Emoji Name'];
		return `Find Emoji by ${info[parseInt(data.info)]}`;
	},
	
	//---------------------------------------------------------------------
        // DBM Mods Manager Variables (Optional but nice to have!)
        //
        // These are variables that DBM Mods Manager uses to show information
        // about the mods for people to see in the list.
        //---------------------------------------------------------------------

        // Who made the mod (If not set, defaults to "DBM Mods")
        author: "Quinten",

        // The version of the mod (Defaults to 1.0.0)
        version: "1.9.2", //Added in 1.9.1

        // A short description to show on the mod line for this mod (Must be on a single line)
        short_description: "Finds a Custom Emoji in Server",

        // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods

        //---------------------------------------------------------------------
	
	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------
	
	variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		return ([data.varName, 'Emoji']);
	},
	
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
	
	fields: ["info", "find", "storage", "varName"],
	
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
		        Created by Quinten
	        </p>
	</div><br>
	<div>
		<div style="float: left; width: 40%;">
			Source Field:<br>
			<select id="info" class="round">
				<option value="0" selected>Emoji ID</option>
				<option value="1">Emoji Name</option>
			</select>
		</div>
		<div style="float: right; width: 55%;">
			Search Value:<br>
			<input id="find" class="round" type="text">
		</div>
	</div><br><br><br>
	<div style="padding-top: 8px;">
		<div style="float: left; width: 35%;">
			Store In:<br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer" style="float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName" class="round" type="text">
		</div>
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
		const msg = cache.msg
		const guild = cache.guild
		const info = parseInt(data.info);
		const find = this.evalMessage(data.find, cache);
		let result;
		switch(info) {
			case 0:
				result = msg.guild.emojis.find(e => e.id === find);
				break;
			case 1:
				result = msg.guild.emojis.find(e => e.name === find);
				break;
			default:
				break;
		}
		if(result !== undefined) {
			const storage = parseInt(data.storage);
			const varName = this.evalMessage(data.varName, cache);
			this.storeValue(result, storage, varName, cache);
		}
		this.callNextAction(cache);
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
