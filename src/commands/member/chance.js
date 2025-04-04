const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "ChanceMeter",
    description: "Calcula uma porcentagem aleatória de chance para algo acontecer.",
    commands: ["chance"],
    usage: `${PREFIX}chance`,
    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101); // 0-100

        // Data e hora formatadas
        const data = new Date().toLocaleDateString("pt-BR");
        const hora = new Date().toLocaleTimeString("pt-BR");

        // Mensagem estilizada
        const message = `
╭─────────────◈
│ 🎲 *CHANCE METER* 🎲
│
│ 📅 *Data:* ${data}
│ ⏰ *Hora:* ${hora}
│ 🔹 *Prefixo:* ${PREFIX}
│
│ 🍀 *Chance de acontecer:* *${randomPercentage}%*
╰─────────────◈

${menuMessage()}
        `.trim();

        // Reação ao comando
        await sendReact("🎲");

        // Envia a imagem com a mensagem
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "chance.jpg"),
            message
        );
    },
};
