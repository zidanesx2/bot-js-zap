const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
    name: "KengaMeter",
    description: "Calcula uma porcentagem aleatória de 'quão kenga' a pessoa é.",
    commands: ["kenga"],
    usage: `${PREFIX}kenga`,

    handle: async ({ sendReply, sendReact }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101); // 0-100

        // Mensagens estilizadas conforme a porcentagem
        let message;
        if (randomPercentage >= 90) {
            message = "🔥 Você é a *RAINHA DAS KENGAS*! Uma lenda viva! 🔥";
        } else if (randomPercentage >= 70) {
            message = "💃 Você é uma *kenga profissional*! Já tem até diploma! 🎓";
        } else if (randomPercentage >= 50) {
            message = "✨ Você é *kenga, mas na medida certa*! Equilíbrio é tudo! 😎";
        } else if (randomPercentage >= 30) {
            message = "🤔 Você tem *potencial kenga*, mas ainda precisa treinar! 📚";
        } else {
            message = "🙈 Você quase não tem kenga no sangue... Vamos trabalhar nisso! 🤣";
        }

        // Mensagem final formatada
        const finalMessage = `
╭━━━💅 *KengaMeter Oficial* 💅━━━╮
┃  
┃  🎭 *Porcentagem Kenga:* *${randomPercentage}%*
┃  
┃  ${message}
┃  
┃  🔥 O estilo e a ousadia fazem parte de você!  
┃  Continue brilhando como uma verdadeira kenga! ✨
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━╯
        `;

        // Adiciona uma reação ao comando
        await sendReact("💃");

        // Envia a resposta com estilo!
        await sendReply(finalMessage);
    },
};
