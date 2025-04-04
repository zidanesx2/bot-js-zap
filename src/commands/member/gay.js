const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "GayMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto gay' a pessoa é.",
    commands: ["gay", "viado"],
    usage: `${PREFIX}gay`,
    handle: async ({ 
        sendReply,
        sendReact,
        sendImageFromFile 
    }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101); // 0-100

        // Cria a mensagem com as informações
        const message = `
 • *𝐃𝐀𝐓𝐀*: ${new Date().toLocaleDateString("pt-br")}
 • *𝐇𝐎𝐑𝐀*: ${new Date().toLocaleTimeString("pt-br")}
 • *𝐏𝐑𝐄𝐅𝐈𝐗𝐎*: ${PREFIX}
`;

        // Adiciona uma reação ao comando
        await sendReact("🏳‍🌈");

        // Envia a imagem com as informações e a porcentagem
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "gay.jpg"),
            `${message}\n🌈 *Você é ${randomPercentage}% gay!* 🌈\n\n${menuMessage()}`
        );
    },
};
