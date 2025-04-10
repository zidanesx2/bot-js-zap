const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "deletar",
  description: "Deleta a mensagem marcada ou respondida.",
  commands: ["deletar", "del"],
  usage: `${PREFIX}deletar`,
  handle: async ({ socket, webMessage, sendReply, remoteJid }) => {
    console.log("[DELETAR] Comando recebido!");

    try {
      if (!webMessage) {
        console.log("[DELETAR] webMessage está indefinido ou nulo.");
        throw new InvalidParameterError("❌ Não consegui encontrar a mensagem para deletar.");
      }

      const deletarMensagem = webMessage.message?.extendedTextMessage?.contextInfo?.stanzaId
        || webMessage.key.id;

      const deletarParticipante = webMessage.message?.extendedTextMessage?.contextInfo?.participant
        || webMessage.key.participant
        || webMessage.key.remoteJid;

      if (!deletarMensagem || !deletarParticipante) {
        console.log("[DELETAR] Não consegui capturar o ID ou o participante da mensagem.");
        throw new InvalidParameterError("❌ Não consegui encontrar a mensagem para deletar.");
      }

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid,
          fromMe: false,
          id: deletarMensagem,
          participant: deletarParticipante,
        },
      });

      console.log("[DELETAR] Mensagem deletada com sucesso!");

      const painelMensagem = `
╭═══⬣ *『 DELETAR - ${BOT_NAME} 』* ⬣═══╮
┃
┃ 📛 A mensagem foi apagada com sucesso!
┃
┃ 🤖 Bot em ação: *${BOT_NAME}*
┃
╰═══⬣ *Sistema de Proteção* ⬣═══╯`;

      await sendReply(painelMensagem);
    } catch (error) {
      console.error("[DELETAR] Erro ao tentar deletar a mensagem:", error);
      throw new InvalidParameterError("❌ Não consegui encontrar a mensagem para deletar.");
    }
  },
};
