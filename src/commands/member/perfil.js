const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "perfil",
  description: "Mostra o perfil do usuário",
  commands: ["perfil"],
  usage: `${PREFIX}perfil`,
  handle: async ({ sendSuccessReact, sendWaitReact, socket, userJid, remoteJid, webMessageInfo, sendReply }) => {

    await sendWaitReact()

    let ppUrl;
    try {
      ppUrl = await socket.profilePictureUrl(userJid, 'image');
    } catch {
      ppUrl = 'https://i.imgur.com/6RLp3cC.png';
    }

    

    const numero = userJid.split('@')[0];

    // 🔧 Nome do perfil: real > pushName > "PERFIL"
    let nome;
    try {
      nome = await socket.getName(userJid);
      if (!nome || nome.toLowerCase().includes("usuário")) {
        nome = webMessageInfo?.pushName || "PERFIL";
      }
    } catch {
      nome = webMessageInfo?.pushName || "PERFIL";
    }

    let foto;
    try {
      const { data: fotoBuffer } = await axios.get(ppUrl, { responseType: 'arraybuffer' });
      foto = await loadImage(fotoBuffer);
    } catch {
      return await sendReply("❌ Erro ao carregar a imagem de perfil.");
    }

    const canvas = createCanvas(750, 420);
    const ctx = canvas.getContext('2d');

    // Fundo com gradiente suave
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f0faff');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cartão principal com sombra
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.08)';
    ctx.shadowBlur = 15;
    ctx.fillRect(40, 30, 670, 350);
    ctx.shadowColor = 'transparent';

    // Painel lateral azul
    ctx.fillStyle = '#0097A7';
    ctx.fillRect(40, 30, 10, 350);

    // Título
    ctx.fillStyle = '#0097A7';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('📋 PAINEL DO PERFIL', 60, 65);

    // Avatar com sombra circular
    ctx.save();
    ctx.beginPath();
    ctx.arc(130, 170, 60, 0, Math.PI * 2);
    ctx.closePath();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.clip();
    ctx.drawImage(foto, 70, 110, 120, 120);
    ctx.restore();

    // Info do usuário
    ctx.fillStyle = '#333';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(nome, 220, 130);

    ctx.fillStyle = '#555';
    ctx.font = '17px sans-serif';
    ctx.fillText(`📱 Número: wa.me/${numero}`, 220, 170);
    ctx.fillText(`📖 Bio: .`, 220, 200);
    ctx.fillText(`💰 Saldo: R$ 00.00`, 220, 230);

    // Linha separadora
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(220, 250);
    ctx.lineTo(640, 250);
    ctx.stroke();

    // Estatísticas
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`📊 Estatísticas`, 220, 280);

    ctx.fillStyle = '#555';
    ctx.font = '16px sans-serif';
    ctx.fillText(`📝 Mensagens: 26`, 220, 310);
    ctx.fillText(`🖥️ Comandos: 3`, 220, 335);

    // Rodapé com data formatada
    ctx.font = 'italic 13px sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText(`🔧 Gerado por ${BOT_NAME || 'GENOS V1.5'} • ${new Date().toLocaleDateString('pt-BR')}`, 420, 370);

    const buffer = canvas.toBuffer();

    await sendSuccessReact();

    await socket.sendMessage(remoteJid, {
      image: buffer,
      caption: '📌 *AQUI ESTA SEU PERFIL!*',
      quoted: webMessageInfo
    });
  }
};
