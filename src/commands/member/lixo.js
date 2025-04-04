const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
    name: "LixoMeter",
    description: "Calcula uma porcentagem aleatória de 'quão lixo' a pessoa é.",
    commands: ["lixo"],
    usage: `${PREFIX}lixo`,
    
    handle: async ({ sendReply, sendReact }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101);

        // Define mensagens baseadas na porcentagem
        let message = "";
        if (randomPercentage <= 10) {
            message = "♻️ *Você é praticamente reciclável!* Parabéns pela pureza! 🌱";
        } else if (randomPercentage <= 30) {
            message = "🗑️ Você tem alguns resíduos, mas nada que um bom banho não resolva. 😆";
        } else if (randomPercentage <= 60) {
            message = "🚯 Cuidado! Você já está jogando lixo no chão... Vamos reciclar essa vibe! ♻️";
        } else if (randomPercentage <= 90) {
            message = "🤢 Meu Deus... o aterro sanitário já está te esperando! Toma um banho, vai! 🚿";
        } else {
            message = "☢️ *ALERTA!* Você foi oficialmente declarado como *LIXO TÓXICO*! Contaminação garantida! ☣️🔥";
        }

        // Adiciona uma reação ao comando
        await sendReact("🗑");

        // Monta a mensagem final com mais detalhes
        const finalMessage = `
╭━━ ⪻⦁  *LixoMeter do ${BOT_NAME}*  ⦁⪻ ━━╮
┃  
┃  🚯 *Seu nível de lixo é:* *${randomPercentage}%* 🚯
┃  
┃  ${message}
┃  
╰━━━━━━━━━━━━━━━━━━━━╯
        `;

        // Envia a resposta
        await sendReply(finalMessage);
    },
};
