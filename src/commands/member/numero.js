const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "numero",
  description: "Descrição do comando",
  commands: ["infonumero"],
  usage: `${PREFIX}numero`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🎃");
    await sendReply("Wa.me//8296627601");
    // código do comando
  },
};