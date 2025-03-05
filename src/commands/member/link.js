const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "link",
  description: "Descrição do comando",
  commands: ["link"],
  usage: `${PREFIX}link`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🤤");
    await sendReply("https://www.albinoblacksheep.com/flash/kikia");
    // código do comando
  },
};