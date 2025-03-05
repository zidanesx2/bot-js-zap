const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "Sorteio",
  description: "Sorteia um número de 1 a 15 e anuncia o vencedor.",
  commands: ["sorteio"],
  usage: `${PREFIX}sorteio`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera um número aleatório entre 1 e 15
    const randomNumber = Math.floor(Math.random() * 15) + 1; // Número entre 1 e 15

    // Adiciona uma reação ao comando
    await sendReact("🎲");

    // Envia a mensagem com o número sorteado
    await sendReply(`🎉 O número sorteado foi: *${randomNumber}*! Parabéns ao vencedor!`);
  },
};
