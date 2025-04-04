const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
    name: "Destino Misterioso",
    description: "Revela uma data aleatória para um grande acontecimento na sua vida.",
    commands: ["destino"],
    usage: `${PREFIX}destino`,

    handle: async ({ sendReply, sendReact }) => {
        // Gera um ano aleatório entre 2025 e 2070
        const year = Math.floor(Math.random() * (2071 - 2025)) + 2025;

        // Gera um mês aleatório entre 1 e 12
        const month = Math.floor(Math.random() * 12) + 1;

        // Gera um dia aleatório para o mês
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;

        // Formata a data para "DD/MM/YYYY"
        const randomDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

        // Lista de possíveis eventos épicos
        const events = [
            "uma reviravolta inesperada que mudará tudo",
            "o dia em que você descobrirá um talento oculto",
            "o encontro com alguém que mudará seu destino para sempre",
            "um prêmio inesperado que te trará grande alegria",
            "uma viagem inesquecível para um lugar dos seus sonhos",
            "o momento em que um desejo profundo se realizará",
            "uma oportunidade única que poderá mudar seu futuro",
            "o início de uma fase de extrema prosperidade",
            "um evento raro que ninguém acreditará que aconteceu",
            "um segredo do passado que será revelado",
            "o dia em que sua alma gêmea cruzará seu caminho",
            "o momento exato em que você receberá uma notícia que mudará tudo"
        ];

        // Seleciona um evento aleatório
        const chosenEvent = events[Math.floor(Math.random() * events.length)];

        // Monta a mensagem final de forma épica
        const finalMessage = `
╭━━━ 🔮 *Destino Misterioso* 🔮 ━━━╮
┃  
┃  📅 *Data Marcada:* *${randomDate}*
┃  ✨ *Evento:* *${chosenEvent}*
┃  
┃  🔥 O universo já escreveu essa data nas estrelas! 
┃  Esteja preparado para o inesperado! 🌠
┃  
╰━━━━━━━━━━━━━━━━━━━━━━╯
        `;

        // Adiciona uma reação ao comando
        await sendReact("🌌");

        // Envia a resposta com a previsão mística
        await sendReply(finalMessage);
    },
};
