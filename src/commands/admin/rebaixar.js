const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "rebaixar",
  description: "Remove um membro do cargo de administrador no grupo",
  commands: ["demote", "rebaixar", "membro"],
  usage: `${PREFIX}rebaixar @marcar_membro 

ou 

${PREFIX}rebaixar (mencionando uma mensagem)`,
  handle: async ({ args, isReply, socket, remoteJid, replyJid, sendReply, sendSuccessReact }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(" *Você precisa mencionar ou marcar um membro!* ");
    }

    const memberToDemoteJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToDemoteNumber = onlyNumbers(memberToDemoteJid);

    if (memberToDemoteNumber.length < 7 || memberToDemoteNumber.length > 15) {
      throw new InvalidParameterError("Número inválido!");
    }

    try {
      await socket.groupParticipantsUpdate(remoteJid, [memberToDemoteJid], "demote");
      await sendSuccessReact();
      await sendReply(`@${memberToDemoteNumber} 🐒 *foi rebaixado para membro comum!* 🐒 `, {
        mentions: [memberToDemoteJid],
      });
    } catch (error) {
      console.error("[GENOS V1 | ERROR] Erro ao rebaixar usuário:", error);
      await sendReply("o Bot precisar ser Administrador porra!");
    }
  },
};
