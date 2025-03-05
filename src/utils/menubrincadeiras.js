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

  return `╭━━➣ 𝐁𝐄𝐌 𝐕𝐈𝐍𝐃𝐎! ━━
🔥
🔥➣ • *${BOT_NAME}*
🔥➣ • *𝐃𝐀𝐓𝐀*: ${date.toLocaleDateString("pt-BR")}
🔥➣ • *𝐇𝐎𝐑𝐀*: ${date.toLocaleTimeString("pt-BR")}
🔥➣ • *𝐏𝐑𝐄𝐅𝐈𝐗𝐎*: ${PREFIX}
╰━━━━━━━━━━━━━

╭━━➣ 𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀𝐒 ━━
🔥➣ • *${PREFIX}𝐟𝐞𝐢𝐨*
🔥➣ • *${PREFIX}𝐛𝐨𝐧𝐢𝐭𝐨*
🔥➣ • *${PREFIX}𝐠𝐚𝐲*
🔥➣ • *${PREFIX}𝐜𝐨𝐫𝐧𝐨*
🔥➣ • *${PREFIX}𝐢𝐧𝐭𝐞𝐥𝐢𝐠𝐞𝐧𝐭𝐞*
🔥➣ • *${PREFIX}𝐬𝐨𝐫𝐭𝐞𝐢𝐨*
🔥➣ • *${PREFIX}𝐦𝐨𝐫𝐭𝐞*
🔥➣ • *${PREFIX}𝐩𝐮𝐭𝐚*
🔥➣ • *${PREFIX}𝐤𝐞𝐧𝐠𝐚*
🔥➣ • *${PREFIX}𝐢𝐝𝐢𝐨𝐭𝐚*
🔥➣ • *${PREFIX}𝐠𝐨𝐬𝐭𝐨𝐬𝐨*
🔥➣ • *${PREFIX}𝐜𝐡𝐚𝐧𝐜𝐞*
🔥➣ • *${PREFIX}𝐩𝐚𝐮*
🔥➣ • *${PREFIX}𝐡𝐞𝐭𝐞𝐫𝐨*
🔥➣ • *${PREFIX}𝐬𝐢𝐠𝐦𝐚*
🔥➣ • *${PREFIX}𝐢𝐥𝐮𝐝𝐢𝐝𝐨(𝐚)*
🔥➣ • *${PREFIX}𝐳𝐞𝐜𝐚*
🔥➣ • *${PREFIX}𝐥𝐢𝐱𝐨*
🔥➣ • *${PREFIX}𝐪𝐮𝐢𝐳*
🔥➣ • *${PREFIX}𝐥𝐢𝐧𝐤*
╰━━─「🚀」─━━`; 

};
 