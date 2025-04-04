const { PREFIX } = require(`${BASE_DIR}/config`);

let messageCounts = {}; // Contagem de mensagens por membro
let processedMessages = new Set(); // Armazena mensagens já processadas
let groupJid = ""; // Armazena o JID do grupo

module.exports = {
  name: "🏆 Rank Ativo",
  description: "📊 Mostra o ranking dos 10 membros mais ativos do grupo!",
  commands: ["rankativo"],
  usage: `${PREFIX}rankativo`,
  handle: async ({ sendText, socket, remoteJid, sendReact }) => {
    try {
      groupJid = remoteJid;

      console.log("🚀 [RANK ATIVO] Comando iniciado!");

      // Reação para indicar que o comando foi recebido
      await sendReact("📊");
      console.log("✅ Reagiu com 📊 e iniciou a contagem!");

      // Escutando o evento de novas mensagens
      socket.ev.on("messages.upsert", ({ messages }) => {
        try {
          messages.forEach((message) => {
            // Verifica se a mensagem pertence ao grupo correto e não é do bot
            if (message.key.remoteJid === groupJid && !message.key.fromMe) {
              const sender = message.key.participant;
              const messageId = message.key.id;

              // Evita contar a mesma mensagem mais de uma vez
              if (!processedMessages.has(messageId)) {
                processedMessages.add(messageId);

                if (!messageCounts[sender]) {
                  messageCounts[sender] = 0;
                }
                messageCounts[sender]++;

                console.log(`📩 Contagem de mensagens de @${sender.split("@")[0]}: ${messageCounts[sender]}`);
              }
            }
          });
        } catch (messageError) {
          console.error("⚠️ Erro ao processar mensagens:", messageError);
        }
      });

      console.log("📊 Contagem de mensagens até o momento:", messageCounts);

      // Obter o ranking dos 10 membros mais ativos
      const sortedMembers = Object.entries(messageCounts)
        .sort((a, b) => b[1] - a[1]) // Ordena por quantidade de mensagens (decrescente)
        .slice(0, 10); // Pega os 10 primeiros

      console.log("🏆 Membros ordenados pelo ranking:", sortedMembers);

      if (sortedMembers.length === 0) {
        await sendText("🤷‍♂️ *Ainda não há mensagens suficientes para gerar um ranking!*");
        return;
      }

      // Geração do texto para envio
      let rankText = `
━━━━━━━━━━━━━━━━━━━━━━━
🏆 *RANKING DOS 10 MAIS ATIVOS* 🏆

🔥 *Os brabos do grupo!* 🔥
━━━━━━━━━━━━━━━━━━━━━━━
`;

      const mentions = [];

      sortedMembers.forEach(([member, count], index) => {
        const medal = ["🥇", "🥈", "🥉"][index] || "🔹";
        rankText += `${medal} *${index + 1}.* @${member.split("@")[0]} ➝ *${count} mensagens*\n`;
        mentions.push(member);
      });

      rankText += `
━━━━━━━━━━━━━━━━━━━━━━━
🎖 *Continue interagindo para subir no ranking!* 🎖
`;

      console.log("📩 Texto do ranking gerado com sucesso!");

      // Envia o ranking no grupo com menções visíveis
      await socket.sendMessage(groupJid, {
        text: rankText,
        mentions: mentions, // Faz menções visíveis
      });

      console.log("✅ Ranking enviado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao gerar ranking de atividade:", error);
      await sendText("⚠️ Ocorreu um erro ao tentar gerar o ranking. Tente novamente!");
    }
  },
};
