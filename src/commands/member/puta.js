const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
  name: "💋 PutaMeter",
  description: "🌶️ Mede o nível de 'putaria' da pessoa com uma porcentagem aleatória!",
  commands: ["puta"],
  usage: `${PREFIX}puta`,
  handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
    try {
      // Gera uma porcentagem aleatória de 0 a 100
      const randomPercentage = Math.floor(Math.random() * 101); // 0-100

      // Formata data e hora
      const dataAtual = new Date().toLocaleDateString("pt-BR");
      const horaAtual = new Date().toLocaleTimeString("pt-BR");

      // Cria a mensagem com as informações formatadas
      const message = `
━━━━━━━━━━━━━━━━━━━━━━━
💋 *PutaMeter do ${BOT_NAME}* 💋
━━━━━━━━━━━━━━━━━━━━━━━
📅 *Data:* ${dataAtual}
🕒 *Hora:* ${horaAtual}
📌 *Prefixo:* ${PREFIX}
━━━━━━━━━━━━━━━━━━━━━━━
👠 *Essa pessoa é ${randomPercentage}% puta!* 👠
━━━━━━━━━━━━━━━━━━━━━━━
${menuMessage()}
      `;

      // Adiciona uma reação para deixar mais estiloso
      await sendReact("🔥");

      // Envia a imagem com a mensagem formatada
      await sendImageFromFile(
        path.join(ASSETS_DIR, "images", "puta.jpg"),
        message
      );

      console.log(`🔥 [PutaMeter] Comando executado com sucesso! Resultado: ${randomPercentage}%`);
    } catch (error) {
      console.error("❌ Erro ao executar o PutaMeter:", error);
      await sendReply("⚠️ Ocorreu um erro inesperado ao calcular o *PutaMeter*! Tente novamente.");
    }
  },
};
