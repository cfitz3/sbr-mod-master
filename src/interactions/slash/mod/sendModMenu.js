const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ButtonStyle } = require(`discord.js`);

const modHelpMenu = new EmbedBuilder()
    .setColor(0xFF69B4)
    .setTitle('Mod Help Menu')
    .setAuthor({ name: 'SBR Guild Bot', iconURL: 'https://i.imgur.com/eboO5Do.png' })
    .setDescription('Welcome to the Moderator control panel. Not sure what to say or do? There are a few options below to help you out!')
    .setTimestamp()
    .setFooter({ text: 'If this breaks let me know ASAP- WIther' })

const syncHelpButton = new ButtonBuilder()
    .setCustomId('syncHelpButton')
    .setLabel('Verify Help')
    .setStyle(ButtonStyle.Success);

const linkHelpButton = new ButtonBuilder()
        .setCustomId('linkHelpButton')
        .setLabel('Link Help')
        .setStyle(ButtonStyle.Success);

const restartGuildButton = new ButtonBuilder()
        .setCustomId('restartGuildButton')
        .setLabel('Restart Guild Bot')
        .setStyle(ButtonStyle.Danger);

const manualGuildRefreshButton = new ButtonBuilder()
        .setCustomId('manualGuildRefreshButton')
        .setLabel('Refresh Guild Data')
        .setStyle(ButtonStyle.Success);

const ticketsLinkButton = new ButtonBuilder()
        .setLabel('Ticket Dashboard')
        .setURL(`http://5.161.243.233:8169/settings/1176585490636488794`)
        .setStyle(ButtonStyle.Link);

        const helpRow = new ActionRowBuilder()
            .addComponents(syncHelpButton, linkHelpButton, manualGuildRefreshButton, ticketsLinkButton, restartGuildButton );
             

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modmenu')
        .setDescription('Mod Command. Sends a help embed for linking Discord accounts on Hypixel.'),

    async execute(interaction) {
        await interaction.reply({
            embeds: [modHelpMenu],
            components: [helpRow],
            ephemeral: true
        });
    },
};