const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/messages`);
const path = require("path");
const fs = require("fs");

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help", "m"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendReact, sendAudioFromFile, userJid, socket, remoteJid }) => {
    try {
      await sendReact("✅");

      // Gera o menu com menção
      const { text, mentions } = menuMessage(userJid);

      await sendAudioFromFile(
            path.join(ASSETS_DIR, "audios", "menu.mp3"),
            true // true = envia como ptt
          );


      // Envia imagem com legenda e menção
      await socket.sendMessage(remoteJid, {
        image: fs.readFileSync(path.join(ASSETS_DIR, "images", "aluguel.jpg")),
        caption: text,
        mentions,
      });

    } catch (err) {
      console.error("❌ Erro ao enviar o menu:", err);
    }
  },
};
