const { PREFIX } = require(`${BASE_DIR}/config`);

const palavras = ["leao", "carro", "programacao", "genos", "baleia", "gis"];
let palavraSecreta = "";
let tentativas = [];
let erros = 0;
const maxErros = 10;

const iniciarJogo = () => {
  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
  tentativas = Array(palavraSecreta.length).fill("_");
  erros = 0;
};

const verificarLetra = (letra) => {
  let acertou = false;
  for (let i = 0; i < palavraSecreta.length; i++) {
    if (palavraSecreta[i] === letra) {
      tentativas[i] = letra;
      acertou = true;
    }
  }
  if (!acertou) erros++;
  return acertou;
};

const obterPalavraFormatada = () => {
  return tentativas.join(" ");
};

module.exports = {
  name: "forca",
  description: "Jogo da Forca",
  commands: ["forca"],
  usage: `${PREFIX}forca <letra> ou ${PREFIX}forca start para iniciar`, 
  handle: async ({ args, sendReply }) => {
    if (args.length === 0) {
      sendReply(`
🎮 *JOGO DA FORCA* 🎮
🔹 Use *${PREFIX}forca start* para iniciar um novo jogo.
🔹 Use *${PREFIX}forca <letra>* para adivinhar uma letra.
`);
      return;
    }

    const comando = args[0].toLowerCase();

    if (comando === "start") {
      iniciarJogo();
      sendReply(`
🚀 *JOGO INICIADO!* 🚀
A palavra secreta contém *${palavraSecreta.length}* letras.
Tente adivinhar uma letra!
      
🔠 Palavra: *${obterPalavraFormatada()}*
💀 Tentativas erradas: 0/${maxErros}
`);
      return;
    }

    if (!palavraSecreta) {
      sendReply("❌ Nenhum jogo em andamento. Use *'/forca start'* para começar!");
      return;
    }

    if (comando.length !== 1 || !comando.match(/[a-z]/i)) {
      sendReply("⚠️ Digite apenas *UMA* letra válida!");
      return;
    }

    if (tentativas.includes(comando)) {
      sendReply("⚠️ Você já tentou essa letra antes! Tente outra.");
      return;
    }

    const acertou = verificarLetra(comando);
    
    if (tentativas.join("") === palavraSecreta) {
      sendReply(`
🎉 *PARABÉNS!* 🎉
Você acertou a palavra secreta: *${palavraSecreta}*! 🏆👏
`);
      palavraSecreta = "";
      return;
    }

    if (erros >= maxErros) {
      sendReply(`
💀 *GAME OVER!* 💀
A palavra secreta era: *${palavraSecreta}*
      
Tente novamente usando *${PREFIX}forca start*.
`);
      palavraSecreta = "";
      return;
    }

    sendReply(`
🎯 *JOGO DA FORCA* 🎯
🔠 Palavra: *${obterPalavraFormatada()}*
❌ Erros: *${erros}/${maxErros}*

Continue tentando! 💪🔥
`);
  },
};
