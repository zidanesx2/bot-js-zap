const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ChanceMeter",
  description: "Calcula uma porcentagem aleatória de 'quanto chance' a pessoa é.",
  commands: ["chance"],
  usage: `${PREFIX}chance`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("🎲");

    // Responde com a porcentagem aleatória
    await sendReply(`🍀 *tem ${randomPercentage}% de chance disso acontecer!* 🍀 `);
  },
};
