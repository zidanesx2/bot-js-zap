const BOT_NUMBER = '558296627601@s.whatsapp.net';
const PREFIX = '/'; 

module.exports = {
  name: "marcar",
  description: "Mencionar todos os membros do grupo",
  commands: ["marcar"],
  usage: `${PREFIX}marcar`,
  handle: async ({
    socket,
    remoteJid,
    sendReply,
    sendSuccessReact,
  }) => {
    try {
      await sendSuccessReact(); 

      
      const groupMetadata = await socket.groupMetadata(remoteJid);
      const participants = groupMetadata.participants;

      
      const validParticipants = participants.filter(member => member.id !== BOT_NUMBER);

      
      const mentions = validParticipants.map(member => member.id);

      
      const mentionsText = mentions.map(id => `@${id.split('@')[0]}`).join('\n');

      
      await socket.sendMessage(remoteJid, {
        text: `📢 Marcação geral feita!\n${mentionsText}`,
        mentions: mentions, 
      });

    } catch (error) {
      console.error("Erro ao marcar os membros:", error);
      await sendReply("🤖 ❌ Erro ao marcar os membros. Tente novamente mais tarde.");
    }
  },
};
