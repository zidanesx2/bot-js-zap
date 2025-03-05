const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  name: "sticker",
  description: "Faço figurinhas de imagem/gif/vídeo",
  commands: ["s", "sticker", "fig", "f"],
  usage: `${PREFIX}sticker (marque a imagem/gif/vídeo) ou ${PREFIX}sticker (responda a uma imagem/gif/vídeo)`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendSuccessReact,
    sendStickerFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem/gif/vídeo ou responder a uma imagem/gif/vídeo"
      );
    }

    const outputPath = path.resolve(TEMP_DIR, "output.webp");

    // Limpeza do arquivo de saída anterior, se existir
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    try {
      if (isImage) {
        const inputPath = await downloadImage(webMessage, "input");

        // Executa o comando ffmpeg para converter a imagem em sticker
        await new Promise((resolve, reject) => {
          exec(
            `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`Erro ao executar ffmpeg: ${error.message}`);
                fs.unlinkSync(inputPath);
                reject(error);
              }
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
              resolve();
            }
          );
        });

        // Envia a figurinha gerada
        await sendSuccessReact();
        await sendStickerFromFile(outputPath);
        fs.unlinkSync(inputPath); // Remove o arquivo original da imagem
      } else if (isVideo) {
        const inputPath = await downloadVideo(webMessage, "input");

        const sizeInSeconds = 10; // Limite de 10 segundos para o vídeo
        const seconds =
          webMessage.message?.videoMessage?.seconds ||
          webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
            ?.videoMessage?.seconds;

        if (seconds > sizeInSeconds) {
          fs.unlinkSync(inputPath); // Remove o vídeo se for maior que o limite
          await sendErrorReply(
            `O vídeo tem mais de ${sizeInSeconds} segundos! Envie um vídeo menor.`
          );
          return;
        }

        // Executa o comando ffmpeg para gerar o gif
        await new Promise((resolve, reject) => {
          exec(
            `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`Erro ao executar ffmpeg: ${error.message}`);
                fs.unlinkSync(inputPath);
                reject(error);
              }
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
              resolve();
            }
          );
        });

        // Envia a figurinha gerada
        await sendSuccessReact();
        await sendStickerFromFile(outputPath, { pack: "Meu Pacote", author: "Olá pessoal" });

        fs.unlinkSync(inputPath); // Remove o vídeo original
      }
    } catch (error) {
      console.log(`Erro durante o processamento do sticker: ${error}`);
      await sendErrorReply("Ocorreu um erro ao tentar criar a figurinha.");
    } finally {
      // Remove o arquivo de saída temporário após o uso
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    }
  },
};
