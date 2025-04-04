const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "PauMeter",
  description: "🍆 Mede o tamanho do seu PAU com precisão científica! 🍆",
  commands: ["pau"],
  usage: `${PREFIX}pau`,
  handle: async ({ sendReply, sendReact }) => {
    console.log("[🍆 PAU METER] Comando ativado!");

    // Gera um número aleatório entre 1 e 50 cm
    const randomNumber = Math.floor(Math.random() * 50) + 1;

    // Reação apropriada
    await sendReact("🍆");

    // Mensagem lendária com toda a sofisticação
    await sendReply(`
🔞 *CALCULADORA DE PAU* 🔞  

📏 *Medindo seu poder...*  
🍌 *Avaliando a grandeza...*  
🔥 *Processando os dados...*  

🍆 *Resultado:* Seu *membro* tem impressionantes *${randomNumber}CM*! 😳💦
    `);
  },
};
