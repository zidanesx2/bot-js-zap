/**
 * Mensagens do bot
 *
 * @author Anthony Dev
 */
const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

exports.menuMessage = () => {
  const date = new Date();

  return `⟅✨ 𝑩𝑶𝑨𝑺-𝑽𝑰𝑵𝑫𝑨𝑺, 𝐆𝐄𝐍𝐎𝐒 𝐕𝟏.𝟓


📌• *${BOT_NAME}*
📅• *DATA*: *${date.toLocaleDateString("pt-br")}*
⏰• *HORA*: *${date.toLocaleTimeString("pt-br")}*
⚡• *PREFIXO*: ${PREFIX}
╰───────────────


🥀 𝑴𝑬𝑵𝑼 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 🫧


╭───────────────
│🩸 🫧 ${PREFIX}menuadm
│🩸 🎮 ${PREFIX}menujogos
│🩸 🥀 ${PREFIX}menuzoeira
│🩸 🌟 /menudono

╰───────────────

🫧 *𝑰𝑵𝑭𝑶 𝑮𝑬𝑹𝑨𝑳* 🫧


╭───────────────
│🩸 📋${PREFIX}infocomunidade
│🩸 📋${PREFIX}infoaluguel 
│🩸 📋${PREFIX}infodono 
│🩸 📋${PREFIX}infonumero  
╰───────────────


🥀 *𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑫𝑬 𝑨𝑪̧𝑶̃𝑬𝑺* 🥀


╭───────────────
│🩸☯${PREFIX}attp  
│🩸☯${PREFIX}cep   
│🩸☯${PREFIX}gpt   
│🩸☯${PREFIX}menubrincadeiras ou /menub  
│🩸☯${PREFIX}numero  
│🩸☯${PREFIX}ping  
│🩸☯${PREFIX}play ou /p    
│🩸☯${PREFIX}sticker 
│🩸☯${PREFIX}to-image
│🩸☯${PREFIX}cite 
│🩸☯${PREFIX}rankativo
│🩸☯${PREFIX}gerarnick
│🩸☯${PREFIX}alugar
╰───────────────`
};

 
