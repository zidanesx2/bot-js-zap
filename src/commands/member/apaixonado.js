const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "ApaixonadoMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto apaixonado' a pessoa é.",
    commands: ["apaixonado", "love"],
    usage: `${PREFIX}apaixonado`,
    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101);

        // Define mensagens especiais para cada nível de paixão
        let status;
        if (randomPercentage === 100) {
            status = "💖 *Você é completamente apaixonado!* Um verdadeiro *Romeu/Julieta da vida real*! 💖";
        } else if (randomPercentage >= 80) {
            status = "🔥 *Você está pegando fogo!* Seu coração bate mais forte que um tambor de escola de samba! 💘";
        } else if (randomPercentage >= 50) {
            status = "😏 *Você sente algo, mas não se entrega fácil!* Tá jogando o famoso *charme*, né? 😉";
        } else if (randomPercentage >= 20) {
            status = "🤔 *Você tem sentimentos, mas esconde bem!* Ou será que tá na dúvida? 👀";
        } else {
            status = "💀 *Seu coração é mais frio que o Polo Norte!* Precisa de um amor urgente! 🥶😂";
        }

        // Painel super estiloso
        const panel = `
╭━━━━━━━━━━━━━━━╮
┃  💕 *APAIXONADO-METER* 💕
┣━━━━━━━━━━━━━━━┛
┃ 📊 *Resultado:*  
┃ Você é *${randomPercentage}% apaixonado!* 😍
┃ ${status}
╰━━━━━━━━━━━━━━━╯
`;

        // Adiciona uma reação ao comando
        await sendReact("💘");

        // Envia a imagem personalizada com a mensagem formatada
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "apaixonado.jpg"),
            `${panel}\n${menuMessage()}`
        );
    },
};
