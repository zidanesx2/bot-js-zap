const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  name: "cite",
  description: "Cita uma mensagem específica no grupo ou no privado.",
  commands: ["cite", "citar"],
  usage: `${PREFIX}cite (marque a mensagem a ser citada)`,
  handle: async ({
    isImage,
    isVideo,
    isSticker,
    isAudio,
    webMessage,
    downloadImage,
    downloadVideo,
    downloadSticker,
    downloadAudio, // Certifique-se de que a função de download de áudio está disponível
    sendErrorReply,
    sendSuccessReact,
    sendReply,
    sendImageFromURL,
    sendVideoFromURL,
    sendStickerFromFile,
    sendAudioFromFile,
    groupMetadata,
    isGroup,
  }) => {
    console.log('[CITE | INFO] Iniciando o comando "cite"...');
    console.log("webMessage recebido:", webMessage);

    const quotedMessage = webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quotedMessage) {
      await sendErrorReply("Você precisa responder a uma mensagem para citá-la.");
      return;
    }
    
    const outputPath = path.resolve(TEMP_DIR, "output.webp");
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    try {
      let messageContent = "";
      let inputPath;
      let isMedia = false;
      
      if (quotedMessage.imageMessage) {
        console.log("[CITE | INFO] Baixando imagem...");
        inputPath = await downloadImage(webMessage, "input");
        console.log("[CITE | INFO] Imagem baixada em:", inputPath);
        await sendImageFromURL(inputPath);
        fs.unlinkSync(inputPath);
        isMedia = true;
      } else if (quotedMessage.videoMessage) {
        console.log("[CITE | INFO] Baixando vídeo...");
        inputPath = await downloadVideo(webMessage, "input");
        console.log("[CITE | INFO] Vídeo baixado em:", inputPath);
        await sendVideoFromURL(inputPath);
        fs.unlinkSync(inputPath);
        isMedia = true;
      } else if (quotedMessage.stickerMessage) {
        console.log("[CITE | INFO] Baixando figurinha...");
        inputPath = await downloadSticker(webMessage, "input");
        console.log("[CITE | INFO] Figurinha baixada em:", inputPath);
        await sendStickerFromFile(inputPath);
        fs.unlinkSync(inputPath);
        isMedia = true;
      } else if (quotedMessage.audioMessage) {
        console.log("[CITE | INFO] Baixando áudio...");
        
        // Verifique se o método de download de áudio está presente
        if (typeof downloadAudio !== 'function') {
          console.log("[CITE | ERRO] downloadAudio não está definido.");
          await sendErrorReply("Não foi possível processar o áudio.");
          return;
        }
        
        inputPath = await downloadAudio(webMessage, "input");
        console.log("[CITE | INFO] Áudio baixado em:", inputPath);
        await sendAudioFromFile(inputPath);
        fs.unlinkSync(inputPath);
        isMedia = true;
      }

      if (!isMedia) {
        if (quotedMessage.conversation) {
          messageContent = quotedMessage.conversation;
        } else if (quotedMessage.extendedTextMessage?.text) {
          messageContent = quotedMessage.extendedTextMessage.text;
        } else {
          messageContent = "[Mensagem sem texto]";
        }
      }
      
      await sendSuccessReact();
      
      if (!isMedia) {
        let replyMessage = `${messageContent}`;
        
        if (isGroup && groupMetadata) {
          console.log("[CITE | INFO] Obtendo dados do grupo...");
          const participants = groupMetadata.participants.map((p) => `@${p.id.split('@')[0]}`).join(" ");
          replyMessage += `\n\n👥 ${participants}`;
        } else {
          console.log("[CITE | INFO] Mensagem enviada no privado ou grupo sem metadados.");
        }
        
        console.log("[CITE | INFO] Enviando mensagem de citação...");
        await sendReply(replyMessage);
      }
    } catch (error) {
      console.log(`Erro durante o processamento da citação: ${error}`);
      await sendErrorReply("Ocorreu um erro ao tentar citar a mensagem.");
    }
  },
};
