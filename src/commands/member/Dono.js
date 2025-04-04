const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "dono",
  description: "Exibe informações sobre o dono do bot.",
  commands: ["infodono"],
  usage: `${PREFIX}dono`,
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("👑");

    // 💎 PAINEL DO DONO SUPREMO! 💎
    const painel = `
╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃    👑 *INFORMAÇÕES DO DONO* 👑
┃━━━━━━━━━━━━━━━━━━━━━━━┃
┃ 🏆 *Líder Supremo:* 𝐃𝐞𝐯 𝐀𝐧𝐭𝐡𝐨𝐧𝐲
┃ 🔥 *Criador Oficial:* 𝐃𝐞𝐯 𝐀𝐧𝐭𝐡𝐨𝐧𝐲
┃ 📞 *Contato:* 〘 wa.me//8296627601 〙
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`;

    await sendReply(painel);
  },
};
