const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menudono`);
const path = require("path");
const fs = require("fs");

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menudono", "menud", "menudonos"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendAudioFromFile, sendReact, userJid, socket, remoteJid }) => {
    try {
      await sendReact("✅");

      // Gera o menu com menção
      const { text, mentions } = menuMessage(userJid);

      await sendAudioFromFile(
        path.join(ASSETS_DIR, "audios", "menudono.mp3"),
        true
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
