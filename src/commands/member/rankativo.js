const { PREFIX } = require(`${BASE_DIR}/config`);

let messageCounts = {}; // Para armazenar o número de mensagens por membro
let groupJid = ""; // Variável para armazenar o JID do grupo atual

module.exports = {
  name: "rankativo",
  description: "Mostrar o ranking dos 10 membros mais ativos",
  commands: ["rankativo"],
  usage: `${PREFIX}rankativo`,
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    try {
      // Salva o remoteJid do grupo onde o comando foi disparado
      groupJid = remoteJid;

      console.log("Comando /rankativo iniciado...");

      // Reagir para mostrar que o comando foi recebido
      await sendReact("📊");
      console.log("Reagiu com o emoji 📊");

      // Escutando o evento de novas mensagens
      socket.ev.on('messages.upsert', ({ messages, type }) => {
        try {
          // Verificando as mensagens e contando a atividade dos membros
          messages.forEach((message) => {
            // Verifica se a mensagem é do grupo correto e não do bot
            if (message.key.remoteJid === groupJid && message.key.fromMe === false) {
              const sender = message.key.participant;
              console.log(`Mensagem do membro: ${sender}`);

              if (!messageCounts[sender]) {
                messageCounts[sender] = 0;
              }
              messageCounts[sender]++;
              console.log(`Contagem de mensagens de ${sender}: ${messageCounts[sender]}`);
            }
          });
        } catch (messageError) {
          console.error("Erro ao processar mensagens:", messageError);
        }
      });

      // Verificando o que está na contagem de mensagens
      console.log("Contagem de mensagens até o momento:", messageCounts);

      // Obter o ranking dos 10 membros mais ativos
      const sortedMembers = Object.entries(messageCounts)
        .sort((a, b) => b[1] - a[1])  // Ordena por quantidade de mensagens (decrescente)
        .slice(0, 10);  // Pega apenas os top 10

      console.log("Membros ordenados pelo ranking:", sortedMembers);

      // Geração do texto para enviar
      let rankText = '🏆 **Ranking dos Top 10 Membros Ativos** 🏆\n\n';
      const mentions = []; // Lista de menções para incluir no ranking
      sortedMembers.forEach(([member, count], index) => {
        rankText += `**${index + 1}.** @${member.split('@')[0]} - ${count} mensagens\n`;
        mentions.push(member);  // Adiciona os membros à lista de menções
      });

      console.log("Texto do ranking gerado:", rankText);

      // Envia o ranking no grupo com menções visíveis
      await socket.sendMessage(groupJid, {
        text: rankText,
        mentions: mentions,  // Menções visíveis
      });

      console.log("Ranking enviado com sucesso!");

    } catch (error) {
      console.error("Erro ao gerar ranking de atividade:", error);
      await sendText("❌ Ocorreu um erro ao tentar gerar o ranking.");
    }
  },
};
