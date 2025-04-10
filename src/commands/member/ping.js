const os = require("os");
const { performance } = require("perf_hooks");
const { PREFIX, BOT_NAME } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ping",
  description: "Verifica o status do bot e desempenho",
  commands: ["ping", "status", "info"],
  usage: `${PREFIX}ping`,
  handle: async ({ sendReply, sendReact, socket }) => {
    const start = performance.now();
    await sendReact("⏱️");

    const latencySimulada = performance.now() - start;
    const uptime = process.uptime(); // em segundos
    const ramMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const uptimeFormatado = formatUptime(uptime);

    const status = `
🤖 *${BOT_NAME || "BOT"} Status*
  
⏱️ *Latência:* ${latencySimulada.toFixed(2)}ms
🧠 *Memória:* ${ramMB} MB / ${totalRAM} GB
🕒 *Uptime:* ${uptimeFormatado}
⚙️ *Node.js:* ${process.version}
📡 *Servidor:* ${os.platform()} • ${os.arch()}
    `.trim();

    await sendReply(status);
  },
};

// 🔁 Formata o uptime em hh:mm:ss
function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
