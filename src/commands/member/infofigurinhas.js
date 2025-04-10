const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "infofigurinhas",
  description: "Mostra informações sobre os tipos de figurinhas disponíveis",
  commands: ["infofigurinhas", "stickerinfo", "figinfo"],
  usage: `${PREFIX}infofigurinhas`,
  handle: async ({ sendReply }) => {
    const info = `
╭━━━〔 ✨ *INFORMAÇÕES DAS FIGURINHAS* ✨ 〕━━━╮
┃
┃ 🎭 *Tipos Disponíveis:*
┃ 
┃ 📌 ${PREFIX}*Animes* - Figurinhas de animes!
┃ 📌 ${PREFIX}*Memes* - Figurinhas  de memes!
┃ 📌 ${PREFIX}*Legais* - Figurinhas legais!
┃ 📌 ${PREFIX}*+18* - Figurinhas mais quentes!
┃ 📌 ${PREFIX}*Aleatórias* - figurinhas aleatorias!
┃
┃ 🎨 *Quer criar sua própria figurinha?*
┃ Digite: *${PREFIX}sticker* e envie sua imagem!
┃
┃ 💡 *Dica:* Utilize *${PREFIX}menu* para ver todos comandos!
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    `;

    await sendReply(info);
  },
};
