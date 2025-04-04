const { BOT_EMOJI } = require("../config");
const { extractDataFromMessage, baileysIs, download } = require(".");
const { waitMessage } = require("./messages");
const fs = require("fs");

exports.loadCommonFunctions = ({ socket, webMessage }) => {
  const {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isReply,
    prefix,
    remoteJid,
    replyJid,
    userJid,
  } = extractDataFromMessage(webMessage);

  if (!remoteJid) {
    return null;
  }

  const isImage = baileysIs(webMessage, "image");
  const isVideo = baileysIs(webMessage, "video");
  const isSticker = baileysIs(webMessage, "sticker");

  // Função para fazer o download de imagens
  const downloadImage = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "image", "png");
  };

  // Função para fazer o download de stickers
  const downloadSticker = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "sticker", "webp");
  };

  // Função para fazer o download de vídeos
  const downloadVideo = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "video", "mp4");
  };

  // Função para enviar texto
  const sendText = async (text, mentions) => {
    let optionalParams = {};

    if (mentions?.length) {
      optionalParams = { mentions };
    }

    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
      ...optionalParams,
    });
  };

  // Função para enviar resposta com texto
  const sendReply = async (text) => {
    return await socket.sendMessage(
      remoteJid,
      { text: `${BOT_EMOJI} ${text}` },
      { quoted: webMessage }
    );
  };

  // Função para enviar reações
  const sendReact = async (emoji) => {
    return await socket.sendMessage(remoteJid, {
      react: {
        text: emoji,
        key: webMessage.key,
      },
    });
  };

  // Função para enviar reação de sucesso
  const sendSuccessReact = async () => {
    return await sendReact("✅");
  };

  // Função para enviar reação de espera
  const sendWaitReact = async () => {
    return await sendReact("⏳");
  };

  // Função para enviar reação de alerta
  const sendWarningReact = async () => {
    return await sendReact("⚠️");
  };

  // Função para enviar reação de erro
  const sendErrorReact = async () => {
    return await sendReact("❌");
  };

  // Função para enviar resposta de sucesso com texto
  const sendSuccessReply = async (text) => {
    await sendSuccessReact();
    return await sendReply(`✅ ${text}`);
  };

  // Função para enviar resposta de espera com texto
  const sendWaitReply = async (text) => {
    await sendWaitReact();
    return await sendReply(`⏳ Aguarde! ${text || waitMessage}`);
  };

  // Função para enviar resposta de alerta
  const sendWarningReply = async (text) => {
    await sendWarningReact();
    return await sendReply(`⚠️ Atenção! ${text}`);
  };

  // Função para enviar resposta de erro
  const sendErrorReply = async (text) => {
    await sendErrorReact();
    return await sendReply(`❌ Erro! ${text}`);
  };

  // Função para enviar stickers a partir de um arquivo
  const sendStickerFromFile = async (file) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: fs.readFileSync(file),
      },
      { quoted: webMessage }
    );
  };

  // Função para enviar stickers a partir de uma URL
  const sendStickerFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: { url },
      },
      { url, quoted: webMessage }
    );
  };

  // Função para enviar imagens a partir de um arquivo
  const sendImageFromFile = async (file, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: fs.readFileSync(file),
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { quoted: webMessage }
    );
  };

  // Função para enviar imagens a partir de uma URL
  const sendImageFromURL = async (url, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: { url },
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { url, quoted: webMessage }
    );
  };

  // Função para enviar áudio a partir de uma URL
  const sendAudioFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        audio: { url },
        mimetype: "audio/mp4",
      },
      { url, quoted: webMessage }
    );
  };

  // Função para enviar vídeo a partir de uma URL
  const sendVideoFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        video: { url },
      },
      { url, quoted: webMessage }
    );
  };

  // Função para enviar áudio a partir de um arquivo
  const sendAudioFromFile = async (file) => {
    return await socket.sendMessage(
      remoteJid,
      {
        audio: fs.readFileSync(file),
        mimetype: 'audio/mp4', // ou 'audio/mp3' dependendo do formato do arquivo
      },
      { quoted: webMessage }
    );
  };

  // Função para enviar um botão com uma mensagem
  const sendButton = async (text, buttonText, buttonData) => {
    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
      buttons: [
        {
          buttonId: buttonData,
          buttonText: { displayText: buttonText },
          type: 1,
        },
      ],
      headerType: 1,
    });
  };

  return {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isImage,
    isReply,
    isSticker,
    isVideo,
    prefix,
    remoteJid,
    replyJid,
    socket,
    userJid,
    webMessage,
    downloadImage,
    downloadSticker,
    downloadVideo,
    sendAudioFromFile,  // Agora incluído no retorno
    sendAudioFromURL,
    sendErrorReact,
    sendErrorReply,
    sendImageFromFile,
    sendImageFromURL,
    sendReact,
    sendReply,
    sendStickerFromFile,
    sendStickerFromURL,
    sendSuccessReact,
    sendSuccessReply,
    sendText,
    sendVideoFromURL,
    sendWaitReact,
    sendWaitReply,
    sendWarningReact,
    sendWarningReply,
    sendButton, // Adicionado aqui
  };
};
