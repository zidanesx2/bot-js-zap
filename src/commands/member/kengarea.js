const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "KengaMeter",
  description: "Calcula uma porcentagem aleatória de 'quão inteligente' a pessoa é.",
  commands: ["kenga"],
  usage: `${PREFIX}kenga`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("👽");

    // Responde com a porcentagem aleatória
    await sendReply(`😎 Você é ${randomPercentage}% kenga rea! 😎`);
  },
};
