const { PREFIX } = require(`${BASE_DIR}/config`);

// Fontes especiais aplicáveis
const fontes = [
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D56C + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝔣𝔬𝔫𝔱𝔢
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D586 + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝖋𝖔𝖓𝖙𝖊
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D670 + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝚏𝚘𝚗𝚝𝚎
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D57A + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝕗𝕠𝕟𝕥𝕖
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D4BF + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝒻ℴ𝓃𝓉ℯ
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D63C + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝙛𝙤𝙣𝙩𝙚
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D4D0 + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝒇𝒐𝒏𝒕𝒆
  (texto) => texto.replace(/[A-Za-z]/g, char => String.fromCodePoint(0x1D5D4 + char.charCodeAt(0) - (char < 'a' ? 65 : 97))), // 𝗳𝗼𝗻𝘁𝗲
  (texto) => texto.replace(/[A-Za-z]/g, char => `${char.toUpperCase()}ᶠ`), // ᶠᵒⁿᵗᵉ
];

// Lista de símbolos decorativos
const simbolos = ["✦", "⚡", "★", "☆", "✪", "❖", "⛥", "☠", "☯", "❂"];

// Função para estilizar um nick com fontes e símbolos especiais
function estilizarNick(nomeBase) {
  const fonteAleatoria = fontes[Math.floor(Math.random() * fontes.length)];
  const simbolo1 = simbolos[Math.floor(Math.random() * simbolos.length)];
  const simbolo2 = simbolos[Math.floor(Math.random() * simbolos.length)];
  return `${simbolo1}${fonteAleatoria(nomeBase)}${simbolo2}`;
}

module.exports = {
  name: "geradornick",
  description: "Gera 10 variações estilizadas do seu nick com fontes e símbolos especiais",
  commands: ["gerarnick", "nick"],
  usage: `${PREFIX}geradornick [seu_nick]`,
  handle: async ({ sendText, sendReact, fullArgs }) => {
    try {
      if (!fullArgs.trim()) {
        return await sendText("❌ Você precisa fornecer um nick! Exemplo: */geradornick MeuNick*");
      }

      await sendReact("🎨"); // Reação para indicar processamento
      
      const nickBase = fullArgs.trim();
      let nicks = [];

      for (let i = 0; i < 10; i++) {
        nicks.push(estilizarNick(nickBase));
      }

      const nickList = nicks.map((nick, index) => `*${index + 1}.* ${nick}`).join("\n");

      // 💎 PAINEL SUPREMAMENTE ESTILOSO 💎
      const painel = `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃  🎨 *GERADOR DE NICKS* 🎨
┣━━━━━━━━━━━━━━━━━━━━━┛
┃ ✨ *Aqui estão 10 variações únicas!* ✨
┃ 💠 *Nick Base:* ${nickBase}
┃ 🛠 *Gerado com fontes e símbolos épicos!*
┣━━━━━━━━━━━━━━━━━━━━━┓
${nickList}
╰━━━━━━━━━━━━━━━━━━━━━╯
`;

      await sendText(painel);
      
    } catch (error) {
      console.error("Erro ao gerar nick:", error);
      await sendText("❌ Ocorreu um erro ao gerar o nick.");
    }
  },
};
