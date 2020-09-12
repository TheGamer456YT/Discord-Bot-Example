const discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    if (!client.isOwner(message.author.id)) { return; }

    if (!args[0]) return message.channel.send("Please provide a command to reload!");

    const commandName = args[0].toLowerCase();
	
    const command = client.commands.get(commandName) || client.commands.get(cient.aliases.get(commandName));
	
    if (!command) return message.channel.send("That command doesn't exist. Try again.");
	
	  fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
		  const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
		  if (files.includes(`${commandName}.js`)) {
			  const file = `${process.cwd()}/commands/${f}/${commandName}.js`;
			  try {
			  	delete require.cache[require.resolve(file)];
			  	client.commands.delete(commandName);
			  	const pull = require(file);
			  	client.commands.set(commandName, pull);
			  	return message.channel.send(`Successfully reloaded \`${commandName}.js\` !`);
		  	  }
			  catch (err) {
			  	message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\` `);
		  		return console.log(err.stack || err);
        		  }
		  }
	  })
};

module.exports.help = {
  name: "reload",
  description: "Reload's a command",
  dm: true,
  aliases: ["r"]
}