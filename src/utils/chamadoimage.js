/**
 * Mensagens do bot
 *
 * @author Anthony Dev
 */
const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";


exports.menuMessage = () => {
  const date = new Date();

 
  if (!BOT_NAME || !PREFIX) {
    throw new Error("BOT_NAME e PREFIX devem ser configurados corretamente em config.");
  }

  return ``; 

};
 