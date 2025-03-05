const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "SigmaMeter",
  description: "Calcula uma porcentagem aleatória de 'quanto sigma' a pessoa é.",
  commands: ["sigma"],
  usage: `${PREFIX}sigma`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("🗿");

    // Responde com a porcentagem aleatória
    await sendReply(`🗿🍷 *Você é ${randomPercentage}% sigma!* 🗿🍷`);
  },
};
