const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "dono",
  description: "Descrição do comando",
  commands: ["dono,"],
  usage: `${PREFIX}dono,`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("👑");
    await sendReply(
      "𝐈𝐍𝐅𝐎 𝐃𝐎𝐍𝐎 【👑】\n𝐋𝐢𝐝𝐞𝐫 :𝐃𝐞𝐯 𝐀𝐧𝐭𝐡𝐨𝐧𝐲\n\n𝐃𝐨𝐧𝐨 𝐨𝐟𝐢𝐜𝐢𝐚𝐥:𝐃𝐞𝐯 𝐀𝐧𝐭𝐡𝐨𝐧𝐲\n𝐍𝐮𝐦𝐞𝐫𝐨:〘 Wa.me//8296627601 〙");
    // código do comando
  },
};