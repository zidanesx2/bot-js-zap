const { PREFIX } = require(`${BASE_DIR}/config`);
const { playAudio } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);

module.exports = {
  name: "play",
  description: "Faço o download de músicas ou vídeos",
  commands: ["l", "t"],
  usage: `${PREFIX}play MC Hariel`,
  handle: async ({
    sendIAMessage,
    sendImageFromURL,
    sendAudioFromURL,
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
    chatId,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError("Você precisa me dizer o que deseja buscar!");
    }

    await sendWaitReact();

    try {
      // Iniciar a busca pela música 
      console.log(`Iniciando busca pela música: ${args.join(" ")}`);
      const data = await playAudio(args.join(" "));

      // Verifique o retorno da função playAudio  
      console.log("Resultado de playAudio:", data);

      if (!data || !data.url) {
        await sendErrorReply("Nenhum resultado encontrado ou URL do áudio não disponível!");
        return;
      }

      // Log dos dados encontrados
      console.log("Dados encontrados:");
      console.log(`Áudio encontrado: ${data.title}`);
      console.log(`Vídeo encontrado: ${data.title}`);

      // Formatar mensagem
      const musicMessage = `🎵 *Música encontrada:*\n*${data.title}*\n⏳ *Duração: ${formatDuration(data.total_duration_in_seconds)}*`;

      // Enviar imagem com a thumbnail da música e a mensagem formatada
      console.log(`Enviando imagem: ${data.thumbnail}`);
      await sendImageFromURL(data.thumbnail, musicMessage, chatId);

      // Enviar o audio diretamente
      console.log(`Enviando áudio...`);
      await sendAudioFromURL(data.url, chatId);

      await sendSuccessReact();
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};

// Função auxiliar para formatar a duração da musica
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
