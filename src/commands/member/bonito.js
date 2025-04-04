const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "BonitoMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto bonito' a pessoa é.",
    commands: ["bonito"],
    usage: `${PREFIX}bonito`,
    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101); 

        // Define uma mensagem especial dependendo da porcentagem
        let status;
        if (randomPercentage === 100) {
            status = "✨ Você é a *perfeição em pessoa*! Um verdadeiro *deus da beleza*! ✨";
        } else if (randomPercentage >= 80) {
            status = "🔥 Você é *charmoso(a) e irresistível*! Um verdadeiro *modelo de passarela*! 🔥";
        } else if (randomPercentage >= 50) {
            status = "😎 Você é *bonito(a), mas tem dias melhores e piores!* Ainda assim, tá *on* no mercado! 😎";
        } else if (randomPercentage >= 20) {
            status = "🤔 A beleza pode estar nos olhos de quem vê, né? Mas talvez um banho ajude... 🤭";
        } else {
            status = "💀 Bom... talvez a beleza interior seja sua melhor qualidade... *Ou não.* 😂";
        }

        // Painel estilizado
        const panel = `
╭━━━━━━━━━━━━━━━╮
┃  🌟 *BONITO-METER* 🌟
┣━━━━━━━━━━━━━━━┛
┃ 📊 *Resultado:*  
┃ Você é *${randomPercentage}% bonito!* 😍
┃ ${status}
╰━━━━━━━━━━━━━━━╯
`;

        // Adiciona uma reação ao comando
        await sendReact("✨");

        // Envia a imagem personalizada com a mensagem formatada
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "bonito.jpg"),
            `${panel}\n${menuMessage()}`
        );
    },
};
