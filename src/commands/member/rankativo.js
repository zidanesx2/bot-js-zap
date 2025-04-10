const fs = require('fs');
const { PREFIX } = require(`${BASE_DIR}/config`);

let messageCounts = {}; // Contagem de mensagens separada por grupo
let processedMessages = new Set(); // Armazena mensagens já processadas
const FILE_PATH = `${BASE_DIR}/messageCounts.json`; // Caminho do arquivo JSON

// Função para carregar os dados do arquivo JSON
function loadMessageCounts() {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH);
    messageCounts = JSON.parse(data);
  }
}

// Função para salvar os dados no arquivo JSON
function saveMessageCounts() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(messageCounts, null, 2));
}

module.exports = {
  name: "🏆 Rank Ativo",
  description: "📊 Mostra o ranking dos 10 membros mais ativos do grupo!",
  commands: ["rankativo"],
  usage: `${PREFIX}rankativo`,
  handle: async ({ sendText, socket, remoteJid, sendReact }) => {
    try {
      console.log(`🚀 [RANK ATIVO] Comando iniciado no grupo: ${remoteJid}`);

      // Carregar os dados do arquivo JSON ao iniciar
      loadMessageCounts();

      // Garante que o objeto do grupo existe
      if (!messageCounts[remoteJid]) {
        messageCounts[remoteJid] = {};
      }

      // Reação para indicar que o comando foi recebido
      await sendReact("📊");
      console.log("✅ Reagiu com 📊 e iniciou a contagem!");

      // Escutando o evento de novas mensagens (apenas uma vez)
      if (!socket.hasRankListener) {
        socket.hasRankListener = true;
        socket.ev.on("messages.upsert", ({ messages }) => {
          try {
            messages.forEach((message) => {
              const groupJid = message.key.remoteJid;

              // Verifica se a mensagem pertence a um grupo e não é do bot
              if (groupJid.endsWith("@g.us") && !message.key.fromMe) {
                const sender = message.key.participant;
                const messageId = message.key.id;

                // Evita contar a mesma mensagem mais de uma vez
                if (!processedMessages.has(messageId)) {
                  processedMessages.add(messageId);

                  if (!messageCounts[groupJid][sender]) {
                    messageCounts[groupJid][sender] = 0;
                  }
                  messageCounts[groupJid][sender]++;

                  console.log(`📩 Contagem de @${sender.split("@")[0]} no grupo ${groupJid}: ${messageCounts[groupJid][sender]}`);
                }
              }
            });

            // Salva as contagens no arquivo JSON a cada evento de mensagem
            saveMessageCounts();

          } catch (messageError) {
            console.error("⚠️ Erro ao processar mensagens:", messageError);
          }
        });
      }

      console.log("📊 Contagem de mensagens até o momento:", messageCounts[remoteJid]);

      // Obter o ranking dos 10 membros mais ativos no grupo atual
      const sortedMembers = Object.entries(messageCounts[remoteJid])
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
      await socket.sendMessage(remoteJid, {
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
