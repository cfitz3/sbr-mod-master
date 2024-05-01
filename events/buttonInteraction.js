const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menutest')
        .setDescription('Simply just sends a test menu.'),
    async execute(interaction) {
        console.log('Received interaction:', interaction);

        const select = new StringSelectMenuBuilder()
            .setCustomId('carries')
            .setPlaceholder('Make a selection!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Slayer')
                    .setDescription('Pricing/Carrier Information for Slayer Carries')
                    .setValue('slayer'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Dungeons')
                    .setDescription('Pricing/Carrier Information for Dungeon Carries')
                    .setValue('dungeons'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Master Mode')
                    .setDescription('Pricing/Carrier Information for Master Mode Carries')
                    .setValue('master mode'),
            );

        const row = new ActionRowBuilder()
            .addComponents(select);

        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFF69B4)
            .setTitle('Carry Information:')
            .setAuthor({ name: 'Skyblock and Relax', iconURL: 'https://i.imgur.com/eboO5Do.png' })
            .setDescription('blah blah blah information about carries in the dropdown menu blah blah blah select an option to see more!')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Dungeon Carries', value: 'Information about dungeon carries below.', inline: true },
                { name: 'Master Mode Carries', value: 'Information about master mode carries below.', inline: true },
            )
            .addFields({ name: 'Slayer Carries', value: 'Information about slayer carries below.', inline: true })
            .setTimestamp()
            .setFooter({ text: 'Need help? Open a ticket in #support or contact @withercloak' });

        console.log('Deferring initial interaction...');
        await interaction.deferReply({ ephemeral: false });

        console.log('Sending initial message...');
        await interaction.editReply({
            content: 'What would you like to learn more about?',
            embeds: [exampleEmbed],
            components: [row],
        });

        console.log('Setting up collector...');
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.SELECT_MENU, time: 20_000 });

        // Add logging to track interaction reply status
        console.log('Interaction replied:', interaction.replied);
        console.log('Interaction deferred:', interaction.deferred);

        collector.on('collect', i => {
            console.log('Interaction collected:', i);
            if (i.user.id === interaction.user.id) {
                console.log(`${i.user.id} selected the ${i.values[0]} option.`);
                interaction.reply(`${i.user.id} selected the ${i.values[0]} option.`); // Use interaction.reply() here
            } else {
                console.log(`This menu isn't for ${i.user.id}!`);
                interaction.reply({ content: `This menu isn't for you!`, ephemeral: true }); // Use interaction.reply() here
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};
