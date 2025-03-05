const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "Pau",
  description: "Sorteia um número de 1 a 15 e anuncia o vencedor.",
  commands: ["pau"],
  usage: `${PREFIX}pau`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera um número aleatório entre 1 e 15
    const randomNumber = Math.floor(Math.random() * 50) + 1; // Número entre 1 e 15

    // Adiciona uma reação ao comando
    await sendReact("🥒");

    // Envia a mensagem com o número sorteado
    await sendReply(` 🍆 *O tamanho do seu pau e: ${randomNumber} CM!* 🍆`);
  },
};
