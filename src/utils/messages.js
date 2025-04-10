/**
 * Mensagens do bot
 *
 * @author Anthony Dev
 */
const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

/**
 * Gera a mensagem de menu com menção ao autor
 * @param {string} senderJid - O JID de quem chamou o comando
 * @returns {{ text: string, mentions: string[] }} - Objeto com texto e menções
 */
exports.menuMessage = (senderJid) => {
  const date = new Date();
  const userNumber = senderJid.split("@")[0]; // extrai apenas o número

  const text = `@${userNumber}

⟅✨ 𝑩𝑶𝑨𝑺-𝑽𝑰𝑵𝑫𝑨𝑺, 𝐆𝐄𝐍𝐎𝐒 𝐕𝟏.𝟓


📌• *${BOT_NAME}*
📅• *DATA*: *${date.toLocaleDateString("pt-br")}*
⏰• *HORA*: *${date.toLocaleTimeString("pt-br")}*
⚡• *PREFIXO*: ${PREFIX}
╰───────────────


🥀 𝑴𝑬𝑵𝑼 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 🫧


╭───────────────
│💘 🫧 ${PREFIX}menuadm
│💘 🎮 ${PREFIX}menujogos
│💘 🥀 ${PREFIX}menubrincadeiras
│💘 🌟 /menudono
╰───────────────

🫧 *𝑰𝑵𝑭𝑶 𝑮𝑬𝑹𝑨𝑳* 🫧


╭───────────────
│💘 📋${PREFIX}infocomunidade
│💘 📋${PREFIX}infoaluguel
│💘 📋${PREFIX}infodono
│💘 📋${PREFIX}infonumero
│💘 📋${PREFIX}infogenos
│💘 📋${PREFIX}infometadinha
│💘 📋${PREFIX}infofigurinhas
╰───────────────


🥀 *𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑫𝑬 𝑨𝑪̧𝑶̃𝑬𝑺* 🥀


╭───────────────
│💘☯${PREFIX}attp  
│💘☯${PREFIX}cep   
│💘☯${PREFIX}gpt   
│💘☯${PREFIX}menubrincadeiras ou /menub  
│💘☯${PREFIX}numero  
│💘☯${PREFIX}ping  
│💘☯${PREFIX}play ou /p    
│💘☯${PREFIX}sticker 
│💘☯${PREFIX}to-image
│💘☯${PREFIX}cite 
│💘☯${PREFIX}rankativo
│💘☯${PREFIX}gerarnick
│💘☯${PREFIX}alugar
│💘☯${PREFIX}animes
│💘☯${PREFIX}perfil
│💘☯${PREFIX}metadinhaanimes
╰───────────────`;

  return {
    text,
    mentions: [senderJid],
  };
};
