const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "z",
  description: "Envia 100 mensagens de 250k de emojis e marca com um ponto.",
  commands: ["z"],  // Comando continua sendo /z
  usage: `${PREFIX}z`,  // Usando o prefixo com /z
  handle: async ({ sendReply, sendReact, socket }) => {
    await sendReact("✅");
    const emojis = "🥵".repeat(250000);  // 250.000 emojis 🥵


    for (let i = 0; i < 1; i++) {
      console.log(`Enviando mensagem de emojis (${i + 1}/100)...`);
      
      const firstMessage = await sendReply(emojis);  
      console.log(`Mensagem de emojis enviada! ID da mensagem: ${firstMessage.key.id}`);
      
      console.log("Estrutura da primeira mensagem:", firstMessage);
      console.log("ID da mensagem:", firstMessage.key.id);
      console.log("JID da mensagem:", firstMessage.key.remoteJid);

      console.log("Configurando resposta com ponto...");

      
      try {
        
        const response = await socket.sendMessage(firstMessage.key.remoteJid, {
          text: "",  
          quoted: firstMessage, 
          contextInfo: { 
            mentionedJid: [firstMessage.key.remoteJid] 
          }
        });
        console.log(`Resposta com ponto enviada para a mensagem de ID: ${firstMessage.key.id}`);
        console.log("Resposta:", response);
      } catch (error) {
        console.error(`Erro ao tentar responder com ponto para a mensagem ID: ${firstMessage.key.id}`);
        console.error(error);
      }
    }
  },
};
