const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const path = require("path");

module.exports = {
  name: "infobot",
  description: "Exibe informações sobre o bot",
  commands: ["infogenos", "informaçoesdobot"],
  usage: `${PREFIX}infobot`,
  handle: async ({ sendAudioFromFile, sendReply, sendReact }) => {

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "audios", "bot.mp3"),
      true
    );

   const infoMessage = `
╭━━━〔 🤖 *INFORMAÇÕES DO BOT* 🤖 〕━━━╮
┃
┃ 🧠 Nome: 𝙂𝙀𝙉𝙊𝙎 𝙑1.5
┃ 📅 Criado em: 𝟬𝟱/𝟬1/𝟮𝟬𝟮𝟱
┃ 👨‍💻 Desenvolvedor: 𝘼𝙣𝙩𝙝𝙤𝙣𝙮
┃ ⚙️ Versão: 𝙑1.5
┃ 💬 Prefixo: *${PREFIX}*
┃ 🔋 Status: 𝙊𝙣𝙡𝙞𝙣𝙚 ✅
┃ 💻 Hospedado em: 𝙋𝘾 𝙋𝙚𝙨𝙨𝙤𝙖𝙡
┃ 🌐 Plataforma: 𝘽𝙖𝙞𝙡𝙚𝙮𝙨
┃ 🧩 Comandos: 𝘿𝙞𝙜𝙞𝙩𝙚 *${PREFIX}menu* 𝙥𝙖𝙧𝙖 𝙫𝙚𝙧 𝙩𝙤𝙙𝙤𝙨
┃ 🔒 Segurança: 𝙀𝙣𝙘𝙧𝙮𝙥𝙩𝙚𝙙 𝘼𝙄-𝘿𝙧𝙞𝙫𝙚𝙣
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
🌟 Obrigado por usar o GENOS! 🌟
    `.trim();
    await sendReact("❤")

    await sendReply(infoMessage);
  },
};
