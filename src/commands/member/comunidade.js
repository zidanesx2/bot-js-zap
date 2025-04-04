const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "comunidade",
  description: "Mostra os links da comunidade",
  commands: ["infocomunidade"],
  usage: `${PREFIX}comunidade`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🌍");

    // Mensagem estilizada
    const message = `
╭━━━━━━━━━━━━━━━╮
┃  🌍 *MINHA COMUNIDADE* 🌍
┣━━━━━━━━━━━━━━━╯
┃ 🔹 *DISCORD:*
┃ 🔗 [Clique aqui](*https://discord.com/invite/Arcsctfy*)
┃ 
┃ 🔹 *WHATSAPP:*
┃ 🔗 [Clique aqui](*https://chat.whatsapp.com/LWFQEJRs1dqAXBYI7Wb1IE*)
╰━━━━━━━━━━━━━━━╯
✨ Venha fazer parte da nossa comunidade! ✨
`;

    await sendReply(message);
  },
};
