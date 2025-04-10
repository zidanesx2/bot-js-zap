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


📌•*${BOT_NAME}*
📅•*DATA*: ${date.toLocaleDateString("pt-br")}
⏰•*HORA*: ${date.toLocaleTimeString("pt-br")}
⚡•*PREFIXO*: ${PREFIX}
╰───────────────

╭━━➣ *BRINCADEIRAS* ━━
│🩸🧸 *${PREFIX}feio*
│🩸🧸 *${PREFIX}bonito*
│🩸🧸 *${PREFIX}gay*
│🩸🧸 *${PREFIX}corno*
│🩸🧸 *${PREFIX}inteligente*
│🩸🧸 *${PREFIX}sorteio*
│🩸🧸 *${PREFIX}morte*
│🩸🧸 *${PREFIX}puta*
│🩸🧸 *${PREFIX}kenga*
│🩸🧸 *${PREFIX}idiota*
│🩸🧸 *${PREFIX}gostoso*
│🩸🧸 *${PREFIX}chance*
│🩸🧸 *${PREFIX}pau*
│🩸🧸 *${PREFIX}hetero*
│🩸🧸 *${PREFIX}sigma*
│🩸🧸 *${PREFIX}iludido(a)*
│🩸🧸 *${PREFIX}zeca*
│🩸🧸 *${PREFIX}lixo*
│🩸🧸 *${PREFIX}link*
╰━━─「🚀」─━━`; 

return {
    text,
    mentions: [senderJid],
  };
};
