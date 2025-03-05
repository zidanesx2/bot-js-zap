const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const { exec } = require("child_process");

module.exports = {
  name: "quiz",
  description: "Comando de quiz que envia uma pergunta aleatória e verifica a resposta.",
  commands: ["quiz"],
  usage: `${PREFIX}quiz`,
  handle: async ({ sendReply, sendReact, webMessage, sendErrorReply, sendSuccessReact, sock }) => {
    // Lista de perguntas e respostas
    const quizzes = [
      {
        question: "Qual a capital do Brasil?",
        options: ["1. Rio de Janeiro", "2. São Paulo", "3. Brasília"],
        correctAnswer: 3
      },
      {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["1. Marte", "2. Júpiter", "3. Saturno"],
        correctAnswer: 2
      },
      {
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1. 1492", "2. 1500", "3. 1600"],
        correctAnswer: 2
      }
    ];

    // Escolhe uma pergunta aleatória
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    console.log("Pergunta escolhida:", quiz.question);  // Log da pergunta escolhida

    // Envia a pergunta e as opções
    const options = quiz.options.join('\n');
    await sendReact("🧠"); // Reação do bot
    await sendReply(`${quiz.question}\n${options}`);
    console.log("Opções enviadas:", options);  // Log das opções enviadas

    // Verifica se `sock` e `sock.ev` estão definidos
    if (!sock || !sock.ev) {
      console.error("Erro: `sock` ou `sock.ev` não estão definidos.");
      return sendErrorReply("Ocorreu um erro com a conexão. Tente novamente mais tarde.");
    }

    // Aguardar a resposta do usuário
    const handleResponse = new Promise((resolve, reject) => {
      // Definir o tempo limite para a resposta (10 segundos)
      const timeout = setTimeout(() => {
        console.log("Tempo limite de resposta excedido!"); // Log do erro de tempo
        reject(new Error('Tempo limite de resposta excedido!'));
      }, 10000); // Ajustado para 10 segundos

      // Escutar as mensagens do usuário
      sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0];

        // Garantir que seja uma resposta válida de 1, 2 ou 3
        if (message?.message?.conversation) {
          const userResponse = message.message.conversation.trim();
          console.log("Resposta recebida do usuário:", userResponse);  // Log da resposta do usuário

          // Verificar se a resposta é um número (1, 2 ou 3)
          if (['1', '2', '3'].includes(userResponse)) {
            if (parseInt(userResponse) === quiz.correctAnswer) {
              clearTimeout(timeout); // Limpar o tempo limite se a resposta for dada
              console.log("Resposta correta!");  // Log de resposta correta
              resolve("correto");
            } else {
              clearTimeout(timeout); // Limpar o tempo limite se a resposta for dada
              console.log("Resposta errada!");  // Log de resposta errada
              resolve("errado");
            }
          } else {
            console.log("Resposta inválida:", userResponse);  // Log de resposta inválida
          }
        }
      });
    });

    // Aguardar a verificação da resposta
    try {
      const response = await handleResponse;

      if (response === "correto") {
        await sendReply("✅ Resposta correta! Parabéns!");
      } else {
        await sendReply("❌ Resposta errada! Tente novamente.");
      }
    } catch (error) {
      if (error.message === 'Tempo limite de resposta excedido!') {
        await sendErrorReply("⏰ Tempo limite de resposta excedido. Tente novamente.");
      }
      console.log("", error);  // Log de erro no processo
    }
  },
};
