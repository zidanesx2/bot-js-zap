const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "HeteroMeter",
  description: "Calcula uma porcentagem aleatória de 'quanto hetero' a pessoa é.",
  commands: ["hetero"],
  usage: `${PREFIX}hetero`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("🗿");

    // Responde com a porcentagem aleatória
    await sendReply(`💪 *Você é ${randomPercentage}% hetero!* 💪`);
  },
};
