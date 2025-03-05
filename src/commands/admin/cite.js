const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const path = require("path");
const fs = require("fs");

module.exports = {
  name: "cite",
  description: "Cita uma mensagem específica no grupo.",
  commands: ["cite", "citar"],
  usage: `${PREFIX}cite (marque a mensagem a ser citada)`,
  handle: async ({
    isImage,
    isVideo,
    isSticker,
    downloadImage,
    downloadVideo,
    downloadSticker,
    webMessage,
    sendErrorReply,
    sendSuccessReact,
    sendReply,
    sendImageFromURL,
    sendVideoFromURL,
    sendAudioFromURL,
    sendStickerFromFile,
  }) => {
    console.log('[CITE | INFO] Iniciando o comando "cite"...');

    // Verifica se a mensagem é uma imagem, vídeo ou figurinha
    if (!isImage && !isVideo && !isSticker && !sendAudioFromURL && !sendImageFromURL ) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem, gif, vídeo ou figurinha ou responder a uma mensagem de mídia."
      );
    }

    const outputPath = path.resolve(TEMP_DIR, "output.webp");

    // Limpeza do arquivo de saída anterior, se existir
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    try {
      // Se for uma imagem
      if (isImage) {
        const inputPath = await downloadImage(webMessage, "input");

        // Processa a imagem e cria a figurinha
        await new Promise((resolve, reject) => {
          exec(
            `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`Erro ao executar ffmpeg: ${error.message}`);
                fs.unlinkSync(inputPath);
                reject(error);
              }
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

        // Processa o vídeo e cria o gif
        await new Promise((resolve, reject) => {
          exec(
            `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(`Erro ao executar ffmpeg: ${error.message}`);
                fs.unlinkSync(inputPath);
                reject(error);
              }
              resolve();
            }
          );
        });

        // Envia o sticker gerado
        await sendSuccessReact();
        await sendStickerFromFile(outputPath, { pack: "Meu Pacote", author: "Olá pessoal" });

        fs.unlinkSync(inputPath); // Remove o vídeo original

      } else if (isSticker) {
        const inputPath = await downloadSticker(webMessage, "input");

        // Apenas envia a figurinha que foi marcada
        await sendSuccessReact();
        await sendStickerFromFile(inputPath);

        fs.unlinkSync(inputPath); // Remove o arquivo de figurinha
      }
    } catch (error) {
      console.log(`Erro durante o processamento da citação: ${error}`);
      await sendErrorReply("Ocorreu um erro ao tentar citar a mensagem.");
    } finally {
      // Remove o arquivo de saída temporário após o uso
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    }
  },
};
