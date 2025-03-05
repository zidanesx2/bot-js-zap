const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menubrincadeiras`);
const path = require("path");

module.exports = {
  name: "menubrincadeiras",
  description: "Menu de comandos",
  commands: ["menub", "helpbrincadeiras", "brincadeiras", "menubrincadeiras"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendReact }) => {

    await sendReact("✅")

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "Lua Bot2.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};