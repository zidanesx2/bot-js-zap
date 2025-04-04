const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menuadm`);
const path = require("path");

module.exports = {
  name: "menuadm",
  description: "Menu de comandos",
  commands: ["menua", "helpbrincadeiras", "brincadeiras", "menuadm", "menubrincadeira"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendReact }) => {

    await sendReact("✅")

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "aluguel.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};