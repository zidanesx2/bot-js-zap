const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

module.exports = {
  name: "animes",
  description: "Envia figurinhas de animes",
  commands: ["animes"],
  usage: `${PREFIX}animes`,
  handle: async ({ sendStickerFromFile, sendReact }) => {
    try {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await sendReact("✨"); // Reação antes de enviar as figurinhas

      const stickers = [
        path.join(ASSETS_DIR, "sticker", "image.webp"),
        path.join(ASSETS_DIR, "sticker", "image2.webp"),
        path.join(ASSETS_DIR, "sticker", "image3.webp"),
        path.join(ASSETS_DIR, "sticker", "image4.webp"),
      ];

      // Função para converter para WebP
      const convertToWebp = (inputPath, outputPath) => {
        return new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .output(outputPath)
            .outputOptions(["-vcodec", "libwebp", "-vf", "scale=512:512"]) // Redimensiona para 512x512
            .on("end", () => resolve(outputPath))
            .on("error", (err) => reject(`Erro na conversão para WebP: ${err.message}`))
            .run();
        });
      };

      // Enviar stickers convertidos para webp
      for (const sticker of stickers) {
        const webpPath = path.join(
          ASSETS_DIR,
          "sticker",
          `${path.basename(sticker, path.extname(sticker))}.webp`
        );

        // Se a imagem não for WebP, converta-a
        if (path.extname(sticker) !== ".webp") {
          console.log(`Convertendo ${sticker} para WebP...`);
          await convertToWebp(sticker, webpPath);
        } else {
          console.log(`Imagem já é WebP: ${sticker}`);
        }

        await sendStickerFromFile(webpPath);
        await delay(1000); // 1 segundo de delay entre cada figurinha
      }
    } catch (error) {
      console.log("Erro no comando animes:", error);
    }
  },
};
