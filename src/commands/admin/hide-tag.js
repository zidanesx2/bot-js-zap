const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "hide-tag",
  description: "Menciona todos os membros do grupo de forma discreta.",
  commands: ["hide-tag", "to-tag", ""],
  usage: `${PREFIX}hidetag [motivo]`,
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    // Obtém os participantes do grupo
    const { participants } = await socket.groupMetadata(remoteJid);
    const mentions = participants.map(({ id }) => id);

    // Define uma mensagem padrão caso o usuário não tenha colocado um motivo
    const motivo = fullArgs.trim() || "Apenas testando a função de marcação! 📢";

    // Reação estilosa para indicar que o comando foi executado
    await sendReact("📢");

    // Painel bonitão para deixar o comando estiloso ✨
    const painel = `
╭───────────────💬
┃  📢 *MENSAGEM PARA TODOS!*  📢
┃─────────────────
┃ ✨ *Motivo:* ${motivo}
┃ 🔥 *Chamando geral!* 🔥
╰───────────────💬
`;

    // Envia a mensagem com o painel e as menções
    await sendText(`${painel}`, mentions);
  },
};
