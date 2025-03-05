const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "desativar",
  description: "Descrição do comando",
  commands: ["desativar,"],
  usage: `${PREFIX}desativar,`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🚫");
    await sendReply(" 🚫 bot desativado do grupo com sucesso!");
    // código do comando
  },
};