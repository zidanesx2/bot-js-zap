const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ativar",
  description: "Descrição do comando",
  commands: ["ativar,"],
  usage: `${PREFIX}ativar,`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("✅");
    await sendReply(" ✅ bot ativado no grupo com sucesso!");
    // código do comando
  },
};