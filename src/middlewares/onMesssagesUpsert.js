/**
 * Evento chamado quando uma mensagem
 * é enviada para o grupo do WhatsApp
 *
 * @author Anthony Dev
 */
const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommonFunctions } = require("../utils/loadCommonFunctions");

exports.onMessagesUpsert = async ({ socket, messages }) => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    const commonFunctions = loadCommonFunctions({ socket, webMessage });

    if (!commonFunctions) {
      continue;
    }

    await dynamicCommand(commonFunctions);
  }
};
