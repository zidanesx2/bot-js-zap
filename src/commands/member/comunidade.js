const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "comunidade",
  description: "Descrição do comando",
  commands: ["comunidade"],
  usage: `${PREFIX}comunidade`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🌍");
    await sendReply("𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐀 𝐌𝐈𝐍𝐇𝐀 𝐂𝐎𝐌𝐔𝐍𝐈𝐃𝐀𝐃𝐄!⤵\n\nhttps://discord.com/invite/Arcsctfy");
    // código do comando
  },
};