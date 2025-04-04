const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors/DangerError`);
const {
  InvalidParameterError,
} = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "banir",
  description: "Removo um membro do grupo",
  commands: ["ban", "kick", "b"],
  usage: `${PREFIX}ban @marcar_membro 
  
ou 

${PREFIX}ban (mencionando uma mensagem)`,
  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "Você precisa mencionar ou marcar um membro!"
      );
    }

    const memberToRemoveJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

    if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
      throw new InvalidParameterError("Número inválido!");
    }

    if (memberToRemoveJid === userJid) {
      throw new DangerError("Você não pode remover você mesmo!");
    }

    const botJid = toUserJid(BOT_NUMBER);

    if (memberToRemoveJid === botJid) {
      throw new DangerError("Você não pode me remover!");
    }

    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveJid],
      "remove"
    );

    await sendSuccessReact();

    await sendReply(`
╭━━━ 🔥 *EXPULSÃO* 🔥 ━━━╮
┃  
┃  🚨 *ALERTA!* 🚨
┃  ❌ O usuário foi removido do grupo!
┃  
┃  🔥 *JUSTIÇA FOI FEITA!* 🔥
┃  
┃  🚀 *FICAREMOS MAIS FORTES SEM ELE!* 🚀
┃  
┃  📌 *Regras do Grupo:*
┃  1️⃣ Respeito sempre.
┃  2️⃣ Sem spam ou flood.
┃  3️⃣ Nada de conteúdo proibido.
┃  
╰━━━━━━━━━━━━━━━━━━━━╯
        `.trim());
  },
};
