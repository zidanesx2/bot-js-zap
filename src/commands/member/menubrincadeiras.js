const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menubrincadeiras`);
const path = require("path");

module.exports = {
  name: "menubrincadeiras",
  description: "Menu de comandos",
  commands: ["menuz", "menuzoeiras", "menuzoeira"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendReact }) => {

    await sendReact("✅")

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "aluguel.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};