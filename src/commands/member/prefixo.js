module.exports = {
  name: "Responder Prefixo",
  description: "Responde quando alguém digita o prefixo do bot.",
  commands: ["/"], // Define a palavra-chave
  usage: "/",

  handle: async ({ sendReply, body }) => {
    try {
      if (body.trim() === "/") { // Verifica se a mensagem é exatamente "/"
        const message = `
╭━━━━━━━━━━━━━━━━━━━╮
┃ 🤖 *BOT ONLINE!* 🚀
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🔹 *Meu prefixo é:* 「 / 」
┃ 🔹 Use /menu para ver os comandos
┃ 🔹 Estou pronto para te ajudar!
╰━━━━━━━━━━━━━━━━━━━╯
        `;

        await sendReply(message);
        console.log("✅ [Prefixo] Mensagem de prefixo enviada com sucesso!");
      }
    } catch (error) {
      console.error("❌ Erro ao responder o prefixo:", error);
      await sendReply("⚠️ Ocorreu um erro ao processar seu comando.");
    }
  },
};
