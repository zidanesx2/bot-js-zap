const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "promover",
  description: "Promove um membro ao cargo de administrador no grupo",
  commands: ["promote", "promover", "adm"],
  usage: `${PREFIX}promover @marcar_membro 

ou 

${PREFIX}promover (mencionando uma mensagem)`,
  handle: async ({ args, isReply, socket, remoteJid, replyJid, sendReply, sendSuccessReact }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(" *Você precisa mencionar ou marcar um membro!* ");
    }

    const memberToPromoteJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToPromoteNumber = onlyNumbers(memberToPromoteJid);

    if (memberToPromoteNumber.length < 7 || memberToPromoteNumber.length > 15) {
      throw new InvalidParameterError("Número inválido!");
    }

    try {
      await socket.groupParticipantsUpdate(remoteJid, [memberToPromoteJid], "promote");
      await sendSuccessReact();
      await sendReply(`@${memberToPromoteNumber} ⚙️ *foi promovido a administrador!* ⚙️ `, {
        mentions: [memberToPromoteJid],
      });
    } catch (error) {
      console.error("[GENOS V1 | ERROR] Erro ao promover usuário:", error);
      await sendReply("O Bot precisa ser Administrador para promover membros!");
    }
  },
};
