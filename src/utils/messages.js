/**
 * Mensagens do bot
 *
 * @author Anthony Dev
 */
const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━➣ 𝐁𝐄𝐌 𝐕𝐈𝐍𝐃𝐎! ━━
🔥
🔥➣ • *${BOT_NAME}*
🔥➣ • *𝐃𝐀𝐓𝐀*: ${date.toLocaleDateString("pt-br")}
🔥➣ • *𝐇𝐎𝐑𝐀*: ${date.toLocaleTimeString("pt-br")}
🔥➣ • *𝐏𝐑𝐄𝐅𝐈𝐗𝐎*: ${PREFIX}
🔥
╰━━─「🪐」─━━

╭━━➣ 𝐃𝐎𝐍𝐎 ━━
🔥
🔥➣ • *${PREFIX}𝐨𝐟𝐟*
🔥➣ • *${PREFIX}𝐨𝐧*
🔥
╰━━─「🌌」─━━

╭━━➣ 𝐀𝐃𝐌𝐈𝐍𝐒 ━━
🔥
🔥➣ • *${PREFIX}𝐚𝐧𝐭𝐢-𝐥𝐢𝐧𝐤 (1/0)*
🔥➣ • *${PREFIX}𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 (1/0)*
🔥➣ • *${PREFIX}𝐛𝐚𝐧 ou /𝐛*
🔥➣ • *${PREFIX}𝐡𝐢𝐝𝐞𝐭𝐚𝐠*
🔥➣ • *${PREFIX}𝐰𝐞𝐥𝐜𝐨𝐦𝐞 (1/0)*
🔥➣ • *${PREFIX}𝐦𝐚𝐫𝐜𝐚𝐫*
🔥
╰━━─「⭐」─━━

╭━━➣ 𝐌𝐄𝐍𝐔 ━━  
🔥  
🔥➣ • *${PREFIX}𝐚𝐥𝐮𝐠𝐮𝐞𝐥*  
🔥➣ • *${PREFIX}𝐚𝐭𝐭𝐩*  
🔥➣ • *${PREFIX}𝐜𝐞𝐩*  
🔥➣ • *${PREFIX}𝐜𝐨𝐦𝐮𝐧𝐢𝐝𝐚𝐝𝐞*  
🔥➣ • *${PREFIX}𝐃𝐨𝐧𝐨*  
🔥➣ • *${PREFIX}𝐠𝐩𝐭*  
🔥➣ • *${PREFIX}𝐢𝐦𝐚𝐠𝐞*  
🔥➣ • *${PREFIX}𝐦𝐞𝐧𝐮𝐛𝐫𝐢𝐧𝐜𝐚𝐝𝐞𝐢𝐫𝐚𝐬*  
🔥➣ • *${PREFIX}𝐧𝐮𝐦𝐞𝐫𝐨*  
🔥➣ • *${PREFIX}𝐩𝐢𝐧𝐠*  
🔥➣ • *${PREFIX}𝐩𝐥𝐚𝐲 ou /𝐩*  
🔥➣ • *${PREFIX}𝐩𝐥𝐚𝐲𝐯 ou /𝐩𝐯*  
🔥➣ • *${PREFIX}𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫*  
🔥➣ • *${PREFIX}𝐫𝐞𝐛𝐚𝐢𝐱𝐚𝐫*  
🔥➣ • *${PREFIX}𝐬𝐭𝐢𝐜𝐤𝐞𝐫*  
🔥➣ • *${PREFIX}𝐭𝐨-𝐢𝐦𝐚𝐠𝐞*  
╰━━─「🌝」─━━`;  


};
