const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const path = require("path");

module.exports = {
    name: "NazistaMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto nazista' a pessoa é.",
    commands: ["nazista", "feio"],
    usage: `${PREFIX}nazista`,
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
        await sendReact("*卐*");

        // Envia a imagem com as informações e a porcentagem
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "nazista.jpg"),
            `${message}\n*卐* *essa pessoa e ${randomPercentage}% nazista!* *卐*\n\n${menuMessage()}`
        );
    },
};
