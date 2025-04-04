const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "spider",
  description: "Envia uma prévia personalizada no WhatsApp",
  commands: ["spider"],
  usage: `${PREFIX}spider`,
  handle: async ({ sendReact, socket, remoteJid }) => {
    try {
      console.log("[SPIDER] Comando iniciado...");
      await sendReact("🎃");

      console.log("[SPIDER] Enviando mensagem com prévia...");

      const linkPreview = {
        canonicalUrl: "https://chat.whatsapp.com/LWFQEJRs1dqAXBYI7Wb1IE",
        matchedText: "https://chat.whatsapp.com/LWFQEJRs1dqAXBYI7Wb1IE",
        title: "🔥 Entre no Grupo VIP!",
        description: "Clique para acessar nosso grupo exclusivo no WhatsApp!",
      };

      const result = await socket.sendMessage(remoteJid, {
        text: "🌍 Confira isso:",
        linkPreview,
      });

      if (result && result.key) {
        console.log("[SPIDER] Mensagem enviada com sucesso! ✅");
      } else {
        console.error("[SPIDER] Falha no envio da mensagem! ❌");
      }

    } catch (error) {
      console.error("[SPIDER] Erro ao executar o comando spider:", error);
      await socket.sendMessage(remoteJid, { text: "❌ Erro ao executar o comando spider!" });
    }
  },
};
