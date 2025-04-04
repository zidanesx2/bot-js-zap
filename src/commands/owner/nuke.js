const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors/DangerError`);
const { onlyNumbers, toUserJid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "n",
  description: "Remove todos os membros do grupo",
  commands: ["n"],
  usage: `${PREFIX}n`,

  handle: async ({
    socket,
    remoteJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {
    try {
      const botJid = toUserJid(BOT_NUMBER);

      // Obtém os participantes do grupo
      const groupMetadata = await socket.groupMetadata(remoteJid);
      const participants = groupMetadata.participants;

      // Filtra membros que não devem ser removidos (bot e quem enviou o comando)
      const membersToRemove = participants
        .map((participant) => participant.id)
        .filter(
          (memberJid) =>
            memberJid !== botJid && memberJid !== userJid
        );

      if (!membersToRemove.length) {
        throw new DangerError(
          "Nenhum membro restante para remover."
        );
      }

      // Remove os membros do grupo
      await socket.groupParticipantsUpdate(
        remoteJid,
        membersToRemove,
        "remove"
      );

      await sendSuccessReact();

      await sendReply("Todos os membros foram removidos com sucesso!");
    } catch (error) {
      console.error(error);
      await sendReply("Ocorreu um erro ao tentar remover os membros.");
    }
  },
};
