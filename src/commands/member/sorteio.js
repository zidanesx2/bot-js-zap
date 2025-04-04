const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "Sorteio",
  description: "🎲 Sorteia um número de 1 a 15 e anuncia o vencedor!",
  commands: ["sorteio"],
  usage: `${PREFIX}sorteio`,
  handle: async ({ sendReply, sendReact }) => {
    console.log("[🎲 SORTEIO] Comando iniciado!");

    // Gera um número aleatório entre 1 e 15
    const randomNumber = Math.floor(Math.random() * 15) + 1;

    // Reação animada para o sorteio
    await sendReact("🎰");

    // Mensagem estilizada com suspense e anúncio do resultado
    await sendReply(`
🎉 *SORTEIO INICIADO!* 🎉
🔢 Preparando para sortear um número entre *1 e 15*...
⏳ *Girando a roleta...* 🎡

🎊 *O NÚMERO SORTEADO FOI:* 🎊
🥁 *${randomNumber}* 🎯

🎈 Parabéns ao vencedor! 🏆  
🔄 Para tentar de novo, envie *${PREFIX}sorteio*! 🚀
    `);
  },
};
