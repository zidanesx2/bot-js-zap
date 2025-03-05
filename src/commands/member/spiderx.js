const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "spider",
  description: "Descrição do comando",
  commands: ["spider"],
  usage: `${PREFIX}spider`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🎃");
    await sendReply("https://api.spiderx.com.br");
    // código do comando
  },
};