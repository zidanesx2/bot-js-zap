/**
 * Evento chamado quando um usuário
 * entra ou sai de um grupo de WhatsApp.
 *
 * @author Anthony Dev
 */
const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers } = require("../utils");
const { isActiveWelcomeGroup } = require("../utils/database");
const { warningLog } = require("../utils/logger");

exports.onGroupParticipantsUpdate = async ({
  groupParticipantsUpdate,
  socket,
}) => {
  const remoteJid = groupParticipantsUpdate.id;
  const userJid = groupParticipantsUpdate.participants[0];

  if (!isActiveWelcomeGroup(remoteJid)) {
    return;
  }

  if (groupParticipantsUpdate.action === "add") {
    try {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      await socket.sendMessage(remoteJid, {
        image: buffer,
        caption: `
╭━━ 🎉 *BEM-VINDO(A)* 🎉 ━━╮
┃  
┃  👋 Olá, @${onlyNumbers(userJid)}!
┃  
┃  Seja muito bem-vindo(a) ao grupo!
┃  Esperamos que se divirta e interaja.
┃  
┃  💬 *Apresente-se!*  
┃  ━━━━━━━━━━━━━━━━━━━
┃  🧑 Nome:
┃  🎂 Idade:
┃  🌆 Cidade:
┃  📥 Foto:
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━╯
        `.trim(),
        mentions: [userJid],
      });

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } catch (error) {
      warningLog(
        "Alguém entrou no grupo e eu não consegui enviar a mensagem de boas-vindas!"
      );
    }
  }
};
