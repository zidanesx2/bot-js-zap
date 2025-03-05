const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "GostosoMeter",
  description: "Calcula uma porcentagem aleatória de 'quanto gostoso' a pessoa é.",
  commands: ["gostoso"],
  usage: `${PREFIX}gostoso`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101); // 0-100

    // Adiciona uma reação ao comando
    await sendReact("🤤");

    // Responde com a porcentagem aleatória
    await sendReply(` 👄 *Você é ${randomPercentage}% gostoso!* 👄`);
  },
};
