const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "IludidoMeter",
  description: "Calcula uma porcentagem aleatória de quão iludido alguém é.",
  commands: ["iludido", "iludida"],
  usage: `${PREFIX}iludido`,

  handle: async ({ sendReply, sendReact }) => {
    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101);

    // Define mensagens baseadas no nível de ilusão
    let message;
    if (randomPercentage >= 90) {
      message = "💔 Você está *completamente iludido*! Já até casou na cabeça! 👰🤵";
    } else if (randomPercentage >= 70) {
      message = "🥺 Você tem *expectativas irreais*! Esperando resposta do crush até hoje... 📱💔";
    } else if (randomPercentage >= 50) {
      message = "😬 Você está *meio iludido*, mas ainda há esperança! 🚩🚩🚩";
    } else if (randomPercentage >= 30) {
      message = "😅 Você até que é realista, mas às vezes se deixa levar... 👀";
    } else {
      message = "😎 Você é *blindado contra ilusões*! Nada te abala! 🔥🦾";
    }

    // Mensagem final estilizada
    const finalMessage = `
╭━━━💔 *IludidoMeter* 💔━━━╮
┃  
┃  🫠 *Nível de Ilusão:* *${randomPercentage}%*
┃  
┃  ${message}
┃  
┃  💌 *Dica:* Quanto maior a ilusão, maior o tombo! ⚠️
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━╯
    `;

    // Adiciona uma reação ao comando
    await sendReact("😈");

    // Envia a mensagem final
    await sendReply(finalMessage);
  },
};
