const { PREFIX } = require(`${BASE_DIR}/config`);
const { playVideo } = require(`${BASE_DIR}/services/spider-x-api`);
const {
  InvalidParameterError,
} = require(`${BASE_DIR}/errors/InvalidParameterError`);

module.exports = {
  name: "play-video",
  description: "Faço o download de vídeos",
  commands: ["play-video", "pv"],
  usage: `${PREFIX}play-video MC Hariel`,
  handle: async ({
    sendIAMessage,
    sendImageFromURL,
    sendVideoFromURL,
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
    chatId,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Você precisa me dizer o que deseja buscar!"
      );
    }

    await sendWaitReact();

    try {
      const data = await playVideo(args[0]);

      if (!data || !data.url || !data.thumbnail) {
        await sendErrorReply("Nenhum resultado encontrado ou informações incompletas!");
        return;
      }

      // Formatar a mensagem com título e duração
      const videoMessage = `🎥 *Vídeo encontrado:*\n*${data.title}*\n⏳ *Duração: ${formatDuration(data.total_duration_in_seconds)}*`;

      // Enviar a imagem com a thumbnail e a mensagem formatada
      console.log(`Enviando imagem: ${data.thumbnail}`);
      await sendImageFromURL(data.thumbnail, videoMessage, chatId);

      // Enviar o vídeo
      console.log(`Enviando vídeo...`);
      await sendVideoFromURL(data.url, chatId);

      await sendSuccessReact();
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};

// Função auxiliar para formatar a duração do vídeo (em segundos) no formato mm:ss
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
