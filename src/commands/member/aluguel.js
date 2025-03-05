const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "aluguel",
  description: "Descrição do comando",
  commands: ["aluguel,"],
  usage: `${PREFIX}aluguel,`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("💸");
    await sendReply("𝐀𝐋𝐔𝐆𝐀-𝐒𝐄 𝐁𝐎𝐓 【💵】\n\n𝐁𝐎𝐓 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 𝐂𝐎𝐌 𝐕𝐀𝐑𝐈𝐎𝐒 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒!!!\n\n𝐏𝐑𝐄Ç𝐎 𝐃𝐎 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 𝐌𝐄𝐍𝐒𝐀𝐋: 25$ ");
    // código do comando
  },
};
