const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "PutaMeter",
  description: "Calcula uma porcentagem aleatória de 'quanto gay' a pessoa é.",
  commands: ["puta"],
  usage: `${PREFIX}puta`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("👩‍🦰");

    // Responde com a porcentagem aleatória
    await sendReply(`🙍‍♀️ Você é ${randomPercentage}% Puta! 🙍‍♀️`);
  },
};
