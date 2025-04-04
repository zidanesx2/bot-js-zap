const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors/InvalidParameterError`);
const {
  activateAntiLinkGroup,
  deactivateAntiLinkGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "anti-link",
  description: "Ativa ou desativa o sistema anti-link no grupo.",
  commands: ["anti-link"],
  usage: `${PREFIX}anti-link (on/off)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "❌ Você precisa digitar *on* ou *off* para ativar ou desativar o sistema anti-link!"
      );
    }

    const antiLinkOn = args[0].toLowerCase() === "on";
    const antiLinkOff = args[0].toLowerCase() === "off";

    if (!antiLinkOn && !antiLinkOff) {
      throw new InvalidParameterError(
        "❌ Parâmetro inválido! Use: *on* para ativar ou *off* para desativar."
      );
    }

    if (antiLinkOn) {
      activateAntiLinkGroup(remoteJid);
    } else {
      deactivateAntiLinkGroup(remoteJid);
    }

    await sendSuccessReact();

    const statusMessage = antiLinkOn
      ? `
╭──❖ 「 *ANTI-LINK ATIVADO* 」 ❖──╮
┃ 🔐 *Sistema anti-link foi ativado!*
┃ 🚫 Links agora serão removidos!
┃ ✅ Proteção em tempo real!
╰───────────────────────────────╯`
      : `
╭──❖ 「 *ANTI-LINK DESATIVADO* 」 ❖──╮
┃ 🔓 *Sistema anti-link foi desativado!*
┃ ⚠️ Os usuários agora podem enviar links.
┃ 📢 Use *${PREFIX}anti-link on* para ativar novamente.
╰──────────────────────────────────╯`;

    await sendReply(statusMessage);
  },
};
