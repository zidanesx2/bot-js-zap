const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "SigmaMeter",
  description: "🗿 Calcula o nível de *Sigma* que alguém possui!",
  commands: ["sigma"],
  usage: `${PREFIX}sigma`,
  handle: async ({ sendReply, sendReact }) => {
    console.log("[🗿 SIGMA METER] Comando iniciado!");

    // Gera uma porcentagem aleatória de 0 a 100
    const randomPercentage = Math.floor(Math.random() * 101);

    // Reação estilosa
    await sendReact("🗿");

    // Mensagem imponente e cheia de presença
    await sendReply(`
╭━━━━━━━🔥━━━━━━━╮
  🗿🍷 *TESTE SIGMA* 🍷🗿
╰━━━━━━━🔥━━━━━━━╯

💠 *Calculando sua energia Sigma...*  
💠 *Processando sua masculinidade alfa...*  
💠 *Avaliando sua frieza e determinação...*  

🎩 *Resultado:* Você é *${randomPercentage}%* SIGMA! 🗿💼

🔱 *Só os verdadeiros sigmas entenderão!* 🔥
    `);
  },
};

