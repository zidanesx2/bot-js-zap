const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "Morte",
  description: "Responde com uma data aleatória de morte.",
  commands: ["morte"],
  usage: `${PREFIX}morte`,
  handle: async ({ sendReply, sendReact }) => {
    // Gera um ano aleatório entre 2023 e 2070
    const year = Math.floor(Math.random() * (2071 - 2025)) + 2025;

    // Gera um mês aleatório entre 1 e 12
    const month = Math.floor(Math.random() * 12) + 1;

    // Gera um dia aleatório para o mês, considerando o ano e o mês
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    // Formata a data para "DD/MM/YYYY"
    const randomDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

    // Adiciona uma reação ao comando
    await sendReact("⚰️");

    // Envia a resposta com a data de morte aleatória
    await sendReply(`⚰️ O dia que voce ira morrer com toda a certeza do mundo e: *${randomDate}*`);
  },
};
