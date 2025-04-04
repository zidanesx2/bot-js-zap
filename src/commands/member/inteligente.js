const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "InteligenteMeter",
    description: "Calcula uma porcentagem aleatória de 'quão inteligente' a pessoa é.",
    commands: ["inteligente"],
    usage: "inteligente",

    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101); // 0-100

        // Define mensagens personalizadas conforme a porcentagem
        let message;
        if (randomPercentage >= 90) {
            message = "📚 Você é um *GÊNIO* digno de um prêmio Nobel! 🏆";
        } else if (randomPercentage >= 70) {
            message = "🧐 Você tem *mente brilhante*! Inteligência pura! 💡";
        } else if (randomPercentage >= 50) {
            message = "🤓 Você é *inteligente*, mas ainda pode evoluir! 🚀";
        } else if (randomPercentage >= 30) {
            message = "🤔 Sua inteligência está ali na média... Mas há potencial! 📈";
        } else {
            message = "🙃 Você tem uma inteligência única... Mas precisa treinar um pouco! 🤣";
        }

        // Mensagem final formatada
        const finalMessage = `
╭━━━🧠 *InteligenteMeter* 🧠━━━╮
┃  
┃  🎓 *Nível de Inteligência:* *${randomPercentage}%*
┃  
┃  ${message}
┃  
┃  🧠 O conhecimento é poder! Continue aprendendo! 📚
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━╯
        `;

        // Adiciona uma reação ao comando
        await sendReact("🧠");

        // Envia a imagem com as informações e a porcentagem
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "inteligente.jpg"),
            `${finalMessage}\n${menuMessage()}`
        );
    },
};
