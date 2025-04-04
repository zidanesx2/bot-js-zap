const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menucomandos`);
const path = require("path");

module.exports = {
  name: "menubrincadeiras",
  description: "Menu de comandos",
  commands: ["menuc", "menucomandos", "menucmd", "menucomando", "menucomand"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendReact }) => {

    await sendReact("✅")

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "aluguel.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};