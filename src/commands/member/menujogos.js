const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/menujogos`);
const path = require("path");

module.exports = {
  name: "menujogos",
  description: "Menu de comandos",
  commands: ["menuj", "menujogos", "menujogo"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendImageFromFile, sendReact }) => {

    await sendReact("✅")

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "aluguel.jpg"),
      `\n\n${menuMessage()}`
    );
  },
};