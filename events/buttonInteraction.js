const { Events, EmbedBuilder, ModalBuilder } = require('discord.js');
const { syncHelp, linkHelp } = require('../responses/embeds/modHelp.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
      if (interaction.customId === 'syncHelpButton') {
        await interaction.reply({ embeds: [syncHelp] });

      } else if (interaction.customId === 'linkHelpButton') {
        await interaction.reply({ embeds: [linkHelp] });

      } else if(interaction.customId === 'restartGuildButton'){
        await interaction.reply({ content: 'Restarting the bot...', ephemeral: true });
        process.exit();
      }
    
    }
	},
};