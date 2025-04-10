const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menuadm`);
const path = require("path");

module.exports = {
  name: "menuadm",
  description: "Menu de comandos",
  commands: ["menua", "helpbrincadeiras", "brincadeiras", "menuadm", "menubrincadeira"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendAudioFromFile, sendReact }) => {

    await sendReact("✅")

    // Enviar o áudio primeiro
    await sendAudioFromFile(
      path.join(ASSETS_DIR, "audios", "admin.mp3"),
      true // true = envia como ptt
    );

    // Depois envia a imagem com o menu
    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "aluguel.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};
