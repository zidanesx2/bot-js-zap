const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "rebaixar",
  description: "Remove um membro do cargo de administrador no grupo.",
  commands: ["demote", "rebaixar", "membro"],
  usage: `${PREFIX}rebaixar @membro  

ou  

${PREFIX}rebaixar (mencionando uma mensagem)`,
  handle: async ({ args, isReply, socket, remoteJid, replyJid, sendReply, sendSuccessReact, sendReact }) => {
    await sendReact("📉");

    // Verifica se um membro foi mencionado ou se é uma resposta a uma mensagem
    if (!args.length && !isReply) {
      throw new InvalidParameterError("❌ *Você precisa marcar ou mencionar um membro para rebaixá-lo!*");
    }

    // Obtém o JID do membro a ser rebaixado
    const memberToDemoteJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToDemoteNumber = onlyNumbers(memberToDemoteJid);

    if (memberToDemoteNumber.length < 7 || memberToDemoteNumber.length > 15) {
      throw new InvalidParameterError("❌ *Número inválido!*");
    }

    try {
      await socket.groupParticipantsUpdate(remoteJid, [memberToDemoteJid], "demote");
      await sendSuccessReact();

      // 🔥 PAINEL ULTRA ESTILOSO! 🔥
      const painel = `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃   📉 *REBAIXAMENTO!* 📉
┃━━━━━━━━━━━━━━━━━━━━━┃
┃ 👤 *Usuário:* @${memberToDemoteNumber}
┃ 😢 *Agora é apenas um membro comum!*
╰━━━━━━━━━━━━━━━━━━━━━╯
`;

      await sendReply(painel, { mentions: [memberToDemoteJid] });
    } catch (error) {
      console.error("[BOT ERROR] Erro ao rebaixar usuário:", error);
      await sendReply("❌ *O Bot precisa ser Administrador para rebaixar membros!*");
    }
  },
};
