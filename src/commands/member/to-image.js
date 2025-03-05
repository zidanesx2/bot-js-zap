const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const {
  InvalidParameterError,
} = require(`${BASE_DIR}/errors/InvalidParameterError`);

module.exports = {
  name: "converter",
  description: "Transformo figurinhas estáticas em imagem",
  commands: ["converter", "toimg", "c"],
  usage: `${PREFIX}converter (marque a figurinha) ou ${PREFIX}converter (responda a figurinha)`,
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendImageFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("Você precisa enviar uma figurinha!");
    }

    const inputPath = await downloadSticker(webMessage, "input");
    const outputPath = path.resolve(TEMP_DIR, "output.png");

    // Limpar arquivo de saída existente
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.error(`Erro ao executar ffmpeg: ${error.message}`);
        throw new Error("Ocorreu um erro ao processar a figurinha.");
      }

      if (fs.existsSync(outputPath)) {
        // Enviar a imagem gerada
        await sendImageFromFile(outputPath);

        // Limpar arquivos temporários
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      } else {
        throw new Error("A conversão falhou, a saída não foi gerada.");
      }
    });
  },
};
