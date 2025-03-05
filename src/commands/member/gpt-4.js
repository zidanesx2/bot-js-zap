const { PREFIX } = require(`${BASE_DIR}/config`);
const { gpt4 } = require(`${BASE_DIR}/services/spider-x-api`);
const {
  InvalidParameterError,
} = require(`${BASE_DIR}/errors/InvalidParameterError`);

module.exports = {
  name: "gpt-4",
  description: "Comandos de inteligência artificial!",
  commands: ["gpt-4", "gpt", "genos", "g"],
  usage: `${PREFIX}gpt com quantos paus se faz uma canoa?`,
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError(
        "Você precisa me dizer o que eu devo responder!"
      );
    }

    await sendWaitReply();

    const responseText = await gpt4(text);

    await sendSuccessReply(responseText);
  },
};
