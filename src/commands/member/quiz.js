const { PREFIX } = require(`${BASE_DIR}/config`);
const { exec } = require("child_process");

module.exports = {
  name: "quiz",
  description: "Desafie seu conhecimento com perguntas aleatórias!",
  commands: ["quiz"],
  usage: `${PREFIX}quiz`,
  handle: async ({ sendReply, sendReact, sendErrorReply, sendSuccessReact, socket }) => {
    console.log("[QUIZ] Comando iniciado!");

    const quizzes = [
      { question: "🏙️ Qual a capital do Brasil?", options: ["1️⃣ Rio de Janeiro", "2️⃣ São Paulo", "3️⃣ Brasília"], correctAnswer: 3 },
      { question: "🪐 Qual é o maior planeta do sistema solar?", options: ["1️⃣ Marte", "2️⃣ Júpiter", "3️⃣ Saturno"], correctAnswer: 2 },
      { question: "📜 Em que ano o Brasil foi descoberto?", options: ["1️⃣ 1492", "2️⃣ 1500", "3️⃣ 1600"], correctAnswer: 2 },
      { question: "👑 Quem foi o primeiro presidente do Brasil?", options: ["1️⃣ Getúlio Vargas", "2️⃣ Juscelino Kubitschek", "3️⃣ Marechal Deodoro da Fonseca"], correctAnswer: 3 },
      { question: "🌊 Qual é o maior oceano do mundo?", options: ["1️⃣ Atlântico", "2️⃣ Índico", "3️⃣ Pacífico"], correctAnswer: 3 },
      { question: "🧪 Qual é o número atômico do oxigênio?", options: ["1️⃣ 8", "2️⃣ 6", "3️⃣ 10"], correctAnswer: 1 },
      { question: "📍 Quantos estados tem o Brasil?", options: ["1️⃣ 26", "2️⃣ 27", "3️⃣ 25"], correctAnswer: 2 },
      { question: "🏞️ Qual é o rio mais extenso do mundo?", options: ["1️⃣ Amazonas", "2️⃣ Nilo", "3️⃣ Yangtzé"], correctAnswer: 1 },
      { question: "🍎 Quem descobriu a gravidade?", options: ["1️⃣ Isaac Newton", "2️⃣ Albert Einstein", "3️⃣ Galileo Galilei"], correctAnswer: 1 },
      { question: "🚀 Quem foi o primeiro homem a pisar na Lua?", options: ["1️⃣ Yuri Gagarin", "2️⃣ Neil Armstrong", "3️⃣ Buzz Aldrin"], correctAnswer: 2 },
      { question: "🐦 Qual é a menor ave do mundo?", options: ["1️⃣ Pardal", "2️⃣ Beija-flor abelha", "3️⃣ Canário"], correctAnswer: 2 },
      { question: "🇦🇷 Qual é a capital da Argentina?", options: ["1️⃣ Buenos Aires", "2️⃣ Lima", "3️⃣ Santiago"], correctAnswer: 1 },
      { question: "🦴 Qual é o maior osso do corpo humano?", options: ["1️⃣ Fêmur", "2️⃣ Tíbia", "3️⃣ Úmero"], correctAnswer: 1 },
      { question: "📖 Quem escreveu 'Dom Quixote'?", options: ["1️⃣ William Shakespeare", "2️⃣ Miguel de Cervantes", "3️⃣ Machado de Assis"], correctAnswer: 2 },
      { question: "🏔️ Qual é a montanha mais alta do mundo?", options: ["1️⃣ K2", "2️⃣ Everest", "3️⃣ Kilimanjaro"], correctAnswer: 2 },
      { question: "🔭 Quantos planetas existem no sistema solar?", options: ["1️⃣ 8", "2️⃣ 9", "3️⃣ 7"], correctAnswer: 1 },
      { question: "💴 Qual é a moeda oficial do Japão?", options: ["1️⃣ Yuan", "2️⃣ Iene", "3️⃣ Won"], correctAnswer: 2 },
      { question: "🧠 Quem foi Albert Einstein?", options: ["1️⃣ Um cientista", "2️⃣ Um pintor", "3️⃣ Um ator"], correctAnswer: 1 },
      { question: "⚡ Qual é o animal mais rápido do mundo?", options: ["1️⃣ Guepardo", "2️⃣ Falcão-peregrino", "3️⃣ Lebre"], correctAnswer: 2 },
      { question: "🇦🇺 Qual é a capital da Austrália?", options: ["1️⃣ Sydney", "2️⃣ Melbourne", "3️⃣ Canberra"], correctAnswer: 3 },
      { question: "🦷 Quantos dentes tem um adulto humano?", options: ["1️⃣ 28", "2️⃣ 30", "3️⃣ 32"], correctAnswer: 3 },
      { question: "💎 Qual é a substância mais dura da natureza?", options: ["1️⃣ Ouro", "2️⃣ Diamante", "3️⃣ Ferro"], correctAnswer: 2 },
      { question: "💡 Quem inventou a lâmpada?", options: ["1️⃣ Nikola Tesla", "2️⃣ Thomas Edison", "3️⃣ Alexander Graham Bell"], correctAnswer: 2 },
      { question: "🗺️ Qual é o menor país do mundo?", options: ["1️⃣ Mônaco", "2️⃣ Vaticano", "3️⃣ Liechtenstein"], correctAnswer: 2 },
      { question: "⚒️ Qual é o símbolo químico do ouro?", options: ["1️⃣ Ag", "2️⃣ Au", "3️⃣ Pb"], correctAnswer: 2 },
      { question: "🎩 Quem tem o maior bigode do mundo?", options: ["1️⃣ Seu Madruga", "2️⃣ Hitler", "3️⃣ Gaby Bigodon"], correctAnswer: 3 }
    ];

    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    const options = quiz.options.join("\n");

    await sendReact("🧠");
    await sendReply(`
✨ *DESAFIO DO QUIZ!* ✨
📌 *${quiz.question}*
${options}

⏳ Você tem *30 segundos* para responder!
Envie apenas o número da alternativa correta.
    `);

    try {
      const response = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("⏰ Tempo limite de resposta excedido!"));
        }, 30000);

        socket.ev.on("messages.upsert", async ({ messages }) => {
          for (const message of messages) {
            if (!message.key.fromMe) {
              let userResponse = message.message?.conversation || 
                                message.message?.extendedTextMessage?.text;

              if (userResponse) {
                userResponse = userResponse.trim();
                if (["1", "2", "3"].includes(userResponse)) {
                  clearTimeout(timeout);
                  resolve(parseInt(userResponse) === quiz.correctAnswer ? "correto" : "errado");
                  return;
                }
              }
            }
          }
        });
      });

      if (response === "correto") {
        await sendSuccessReact();
        await sendReply(`
🎉 *PARABÉNS!* 🎉
✅ Você acertou! A resposta correta era: *${quiz.options[quiz.correctAnswer - 1]}*.
🏆 Continue assim e desafie seus amigos!
        `);
      } else {
        await sendReply(`
❌ *Resposta errada!* ❌
A resposta correta era: *${quiz.options[quiz.correctAnswer - 1]}*.
🧠 Não desista! Tente novamente enviando *${PREFIX}quiz*.
        `);
      }
    } catch (error) {
      if (error.message.includes("Tempo limite de resposta excedido")) {
        await sendErrorReply(`
⏳ *Tempo esgotado!*
Você demorou para responder! A resposta correta era: *${quiz.options[quiz.correctAnswer - 1]}*.
📢 Tente de novo enviando *${PREFIX}quiz*!
        `);
      }
      console.error("[QUIZ] Erro durante a verificação da resposta:", error);
    }
  },
};
