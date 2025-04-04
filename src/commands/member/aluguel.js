const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const path = require("path");

module.exports = {
    name: "AluguelMeter",
    description: "Calcula uma porcentagem aleatória de 'quanto aluguel' a pessoa é.",
    commands: ["infoaluguel", "viado"],
    usage: `${PREFIX}aluguel`,
    handle: async ({ sendReply, sendReact, sendImageFromFile }) => {
        // Gera uma porcentagem aleatória de 0 a 100
        const randomPercentage = Math.floor(Math.random() * 101);

        // Formata a data e hora
        const dataAtual = new Date().toLocaleDateString("pt-BR");
        const horaAtual = new Date().toLocaleTimeString("pt-BR");

        // Mensagem formatada
        const message = `✦ *INFORMAÇÕES DO ALUGUEL* ✦\n\n` +
            `📅 *Data:* ${dataAtual}\n` +
            `⏰ *Hora:* ${horaAtual}\n` +
            `🔹 *Prefixo:* ${PREFIX}\n\n` +
            `💼 *AluguelBot* oferece um serviço completo com mais de *100 comandos*!\n` +
            `💰 *Valor mensal:* R$15\n\n` +
            `🔗 Para alugar, use o comando: */alugar*`;

        // Adiciona uma reação ao comando
        await sendReact("💼");

        // Envia a imagem com as informações formatadas
        await sendImageFromFile(
            path.join(ASSETS_DIR, "images", "aluguel.jpg"),
            message
        );
    },
};