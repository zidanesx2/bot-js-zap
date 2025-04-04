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

  return `⟅✨ 𝑩𝑶𝑨𝑺-𝑽𝑰𝑵𝑫𝑨𝑺, 𝐆𝐄𝐍𝐎𝐒 𝐕𝟏.𝟓
📌•*${BOT_NAME}*
📅•*DATA*: ${date.toLocaleDateString("pt-br")}
⏰•*HORA*: ${date.toLocaleTimeString("pt-br")}
⚡•*PREFIXO*: ${PREFIX}
╰───────────────

╭━━➣ *BRINCADEIRAS* ━━
│🩸🧸 *${PREFIX}feio*
│🩸🧸  *${PREFIX}bonito*
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
};