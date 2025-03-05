module.exports = {
    name: "responder_oi",
    description: "Responde automaticamente quando alguém digita 'oi'.",
    commands: ["oi"], // Define a palavra-chave
    usage: "oi",
  
    handle: async ({ sendReply, body }) => {
      if (body.trim().toLowerCase() === "oi") { // Verifica se a mensagem é exatamente "oi"
        await sendReply("Oi! Como posso te ajudar? 😊");
      }
    },
  };
  