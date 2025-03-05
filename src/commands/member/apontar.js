const { PREFIX, API_KEY, TEMP_DIR } = require(`${BASE_DIR}/config`);
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { uploadImage } = require("../utils/uploadImage");

module.exports = {
  name: "apontar",
  description: "Bolsonaro aponta para a imagem marcada.",
  commands: ["apontar"],
  usage: `${PREFIX}apontar <marcar imagem ou figurinha>`,
  handle: async ({ sendImage, quoted, sendReply, isSticker, downloadSticker }) => {
    try {
      if (!quoted || (!quoted.message.imageMessage && !isSticker)) {
        throw new Error("Você precisa marcar uma imagem ou figurinha para usar este comando!");
      }
      
      let imageUrl;
      const inputPath = path.join(TEMP_DIR, `input_${Date.now()}.png`);
      
      if (isSticker) {
        // Converter figurinha para imagem
        const stickerPath = await downloadSticker(quoted, "sticker");
        await new Promise((resolve, reject) => {
          exec(`ffmpeg -i ${stickerPath} ${inputPath}`, (error) => {
            if (error) {
              console.error(`Erro ao converter figurinha: ${error.message}`);
              return reject(new Error("Falha ao converter figurinha para imagem."));
            }
            resolve();
          });
        });
        fs.unlinkSync(stickerPath);
      } else {
        // Baixa a imagem normal
        const buffer = await quoted.downloadMediaMessage();
        fs.writeFileSync(inputPath, buffer);
      }
      
      // Faz upload da imagem e obtém a URL
      imageUrl = await uploadImage(inputPath);
      if (!imageUrl) {
        throw new Error("Falha ao fazer upload da imagem!");
      }
      
      // Chama a API do Spider X
      console.log("erro na api key")
      const apiUrl = `https://api.spiderx.com.br/api/canvas/bolsonaro?image_url=${encodeURIComponent(imageUrl)}&api_key=${API_KEY}`;
      console.log("imagem carregada com sucesso")


      console.log("Solicitando imagem para URL:", apiUrl);
      await sendImage(apiUrl, "Aqui está a imagem do Bolsonaro apontando!");
      console.log("Imagem enviada com sucesso!");
      
      // Remove o arquivo temporário
      fs.unlinkSync(inputPath);
    } catch (error) {
      console.error("Erro ao obter a imagem do Bolsonaro apontando:", error.message);
      await sendReply("Ocorreu um erro ao processar sua imagem ou figurinha. Certifique-se de marcar um arquivo válido!");
    }
  },
};
