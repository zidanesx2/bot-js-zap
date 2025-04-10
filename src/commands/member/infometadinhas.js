const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "infometadinhas",
  description: "Mostra informações sobre os tipos de metadinhas disponíveis",
  commands: ["infometadinhas", "metainfo", "tiposmetadinhas"],
  usage: `${PREFIX}infometadinhas`,
  handle: async ({ sendReply }) => {
    const info = `
╭━━━〔 💕 *INFORMAÇÕES DAS METADINHAS* 💕 〕━━━╮
┃
┃ 💖 *Tipos de Metadinhas Disponíveis:*
┃ 
┃ 🥰 ${PREFIX}*metadinhaAnimes* - Metadinhas de animes!
┃ 💑 ${PREFIX}*metadinhaCasal* - Metadinhas de casal fofo!
┃ 😂 ${PREFIX}*metadinhaMemes* - Metadinhas engraçadas!
┃
┃ ✨ *Quer buscar uma metadinha?*
┃ Digite: *${PREFIX}metadinha* e escolha o tipo!
┃
┃ 💡 *Dica:* Utilize *${PREFIX}menu* para ver todos comandos!
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
    `;

    await sendReply(info);
  },
};
