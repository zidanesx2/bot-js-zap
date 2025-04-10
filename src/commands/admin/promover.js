const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const  path  = require("path");
const { ASSETS_DIR } = require("../../config");

module.exports = {
  name: "promover",
  description: "Promove um membro ao cargo de administrador no grupo.",
  commands: ["promote", "promover", "adm"],
  usage: `${PREFIX}promover @membro  

ou  

${PREFIX}promover (mencionando uma mensagem)`,
  handle: async ({ args, sendAudioFromFile, isReply, socket, remoteJid, replyJid, sendReply, sendSuccessReact, sendReact }) => {
    await sendReact("⚙️");

    // Verifica se um membro foi mencionado ou se é uma resposta a uma mensagem
    if (!args.length && !isReply) {
      throw new InvalidParameterError("❌ *Você precisa marcar ou mencionar um membro para promovê-lo!*");
    }

    // Obtém o JID do membro a ser promovido
    const memberToPromoteJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToPromoteNumber = onlyNumbers(memberToPromoteJid);

    if (memberToPromoteNumber.length < 7 || memberToPromoteNumber.length > 15) {
      throw new InvalidParameterError("❌ *Número inválido!*");
    }

    try {
      await socket.groupParticipantsUpdate(remoteJid, [memberToPromoteJid], "promote");
      await sendSuccessReact();

      await sendAudioFromFile(
        path.join(ASSETS_DIR, "audios", "promover.mp3"),
        true
      );

      // 🔥 PAINEL MEGA ESTILOSO! 🔥
      const painel = `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃   🚀 *PROMOÇÃO REALIZADA!* 🚀
┃━━━━━━━━━━━━━━━━━━━━━┃
┃ 👤 *Usuário:* @${memberToPromoteNumber}
┃ 🏆 *Agora é um Administrador!*
╰━━━━━━━━━━━━━━━━━━━━━╯
`;

      await sendReply(painel, { mentions: [memberToPromoteJid] });
    } catch (error) {
      console.error("[BOT ERROR] Erro ao promover usuário:", error);
      await sendReply("❌ *O Bot precisa ser Administrador para promover membros!*");
    }
  },
};
