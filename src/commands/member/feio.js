const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "FeiaMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto feia' a pessoa é.",
    commands: ["feia", "feio"],
    usage: `${PREFIX}feia`,
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
        await sendReact("👩");

        // Envia a imagem com as informações e a porcentagem
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "feia.jpg"),
            `${message}\n👩 *essa pessoa e ${randomPercentage}% feia!* 👩\n\n${menuMessage()}`
        );
    },
};
