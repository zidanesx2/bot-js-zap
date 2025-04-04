const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "CornoMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto corno' a pessoa é.",
    commands: ["corno"],
    usage: `${PREFIX}corno`,
    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101);

        // Define mensagens baseadas na porcentagem
        let status = "";
        if (randomPercentage === 0) {
            status = "🦸 *Parabéns! Você é 100% fiel!* 💪🔥";
        } else if (randomPercentage <= 20) {
            status = "😌 *Quase nada corno... ainda está salvo!*";
        } else if (randomPercentage <= 50) {
            status = "🤨 *Tá começando a ficar perigoso... cuidado!*";
        } else if (randomPercentage <= 80) {
            status = "😬 *Eita, já tá com o chifre coçando!*";
        } else if (randomPercentage < 100) {
            status = "💔 *Rapaz... a resenha no bar já tem seu nome!*";
        } else {
            status = "🐂 *100% corno! Já pode pedir música no Fantástico!* 😂🎶";
        }

        // Adiciona uma reação ao comando
        await sendReact("🐂");

        // Painel estilizado
        const panel = `
╭━━━━━━━━━━━━━━━╮
┃    🐂 *CORNO-METER* 🐂
┣━━━━━━━━━━━━━━━┛
┃ 📊 *Resultado:*  
┃ Você é *${randomPercentage}%* corno! 🤠💔
┣━━━━━━━━━━━━━━━
┃ ${status}
╰━━━━━━━━━━━━━━━╯
`;

        // Envia a imagem personalizada com a mensagem formatada
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "corno.jpg"),
            `${panel}\n${menuMessage()}`
        );
    },
};
