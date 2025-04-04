const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { PREFIX, ASSETS_DIR, BOT_NAME } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/utils/chamadoimage`);
const https = require("https");

function formatUploadDate(uploadDate) {
  if (!uploadDate || uploadDate.length !== 8) return "Data desconhecida";
  return `${uploadDate.substring(6, 8)}/${uploadDate.substring(4, 6)}/${uploadDate.substring(0, 4)}`;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}


function formatNumber(num) {
  return num ? num.toLocaleString("pt-BR") : "0";
}



function loadingBar(progress) {
  const totalLength = 5;
  const completedLength = Math.floor(progress * totalLength);
  const remainingLength = totalLength - completedLength;
  const bar = '▓'.repeat(completedLength) + '░'.repeat(remainingLength);
  const percentage = Math.floor(progress * 100);
  return percentage < 100 
    ? `*Carregando...* [${bar}] ${percentage}%`
    : `*Carregado!* [${"▓".repeat(totalLength)}] 100%`;
}



module.exports = {
  name: "play",
  description: "Baixa e envia músicas do YouTube usando yt-dlp",
  commands: ["play", "p", "tocar", "ouvir", "audio", "musica"],
  usage: `${PREFIX}play MC Hariel`,
  handle: async ({
    sendImageFromFile,
    sendAudioFromFile,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
    sendReply,
    args,
    socket,
  }) => {
    if (!args.length) {
      return sendErrorReply("Você precisa me dizer o que deseja buscar!. Exemplo: /play Marilia Mendonça.");
    }

    await sendWaitReact();

    try {
      const query = args.join(" ");
      console.log(`🔍 Buscando música: ${query}`);

      let progress = 0.0;
      let loadingMessage = await sendReply(loadingBar(progress));

      let interval = setInterval(async () => {
        progress += 0.25;
        if (progress > 1) progress = 1;

        await socket.sendMessage(loadingMessage.key.remoteJid, {
          text: loadingBar(progress),
          edit: loadingMessage.key,
        });

        if (progress >= 1) {
          clearInterval(interval);
          console.log("Carregamento completo!");
        }
      }, 1000);

      const ytDlpCommand = `yt-dlp -j --default-search "ytsearch" "${query}"`;
      exec(ytDlpCommand, async (error, stdout, stderr) => {
        if (error) {
          console.error("Erro ao buscar informações da música:", error);
          return sendErrorReply("Erro ao buscar informações da música!");
        }

        const videoInfo = JSON.parse(stdout);
        const { title, uploader, view_count, duration, thumbnail, webpage_url, like_count, upload_date } = videoInfo;

        const formattedUploadDate = formatUploadDate(upload_date); 
                const formattedViews = formatNumber(view_count); 
                const formattedLikes = formatNumber(like_count); 

        console.log("✅ Música encontrada:", title);

        const downloadsDir = path.join(__dirname, "downloads");
        if (!fs.existsSync(downloadsDir)) {
          fs.mkdirSync(downloadsDir, { recursive: true });
        }

        const safeTitle = title.replace(/[/\\:*?"<>|]/g, "");
        const imagePath = path.join(downloadsDir, `${safeTitle}-thumbnail.jpg`);
        const file = fs.createWriteStream(imagePath);
        https.get(thumbnail, (response) => {
          response.pipe(file);
          file.on("finish", async () => {
            console.log("✅ Imagem baixada!");

            
const sendOptions = {
 caption: `🎶 *Música*: *${title}*\n` +
          `❤️ *Likes*: *${formattedLikes}*\n` +
           `📅 *Postado em*: *${formatUploadDate(upload_date)}*\n` +
           `🎤 *Artista*: *${uploader}*\n` +
           `👀 *Views*: *${formattedViews}*\n` +
           `⏳ *Duração*: *${duration}* *segundos*\n` +
           `🔗 *Link*: [Clique aqui para assistir](*${webpage_url}*)`,
  quotedMessageId: undefined, 
  mentions: [],
};

console.log("🔎 Enviando imagem com legenda...");


await sendImageFromFile(imagePath, sendOptions.caption);


            fs.unlinkSync(imagePath); 

            const outputPath = path.join(downloadsDir, `${safeTitle}.mp3`);
            const ytDlpAudioCommand = `yt-dlp --extract-audio --audio-format mp3 --default-search "ytsearch" -o "${outputPath}" "${query}"`;

            exec(ytDlpAudioCommand, async (error, stdout, stderr) => {
              if (error) {
                console.error("Erro ao baixar áudio:", error);
                return sendErrorReply("Erro ao baixar a música!");
                
              }

              console.log("✅ Música baixada:", stdout);

              try {
                await sendAudioFromFile(outputPath);
                fs.unlinkSync(outputPath);
                sendSuccessReact();
              } catch (err) {
                console.error("Erro ao enviar música:", err);
                sendErrorReply("Erro ao enviar a música!");
              }
            });
          });
        });
      });
    } catch (error) {
      console.error("[ERRO]", error);
      await sendErrorReply("Erro inesperado ao processar a música.");
    }
  },
};
