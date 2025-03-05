/**
 * Logs
 *
 * @author Anthony Dev
 */
const { version } = require("../../package.json");

exports.sayLog = (message) => {
  console.log("\x1b[36m[GENOS V1 | TALK]\x1b[0m", message);
};

exports.inputLog = (message) => {
  console.log("\x1b[30m[GENOS V1 | INPUT]\x1b[0m", message);
};

exports.infoLog = (message) => {
  console.log("\x1b[34m[GENOS V1 | INFO]\x1b[0m", message);
};

exports.successLog = (message) => {
  console.log("\x1b[32m[GENOS V1 | SUCCESS]\x1b[0m", message);
};

exports.errorLog = (message) => {
  console.log("\x1b[31m[GENOS V1 | ERROR]\x1b[0m", message);
};

exports.warningLog = (message) => {
  console.log("\x1b[33m[GENOS V1 | WARNING]\x1b[0m", message);
};

exports.bannerLog = () => {
  console.log(`\x1b[36m\x1b[0m`);
  console.log(``);
  console.log(`\x1b[36m\x1b[0m`);
  console.log(`\x1b[36m🚀 GENOS V1 - Sistema Ativo!\x1b[0m`);
  console.log(`\x1b[36m🤖 Versão: \x1b[0m${version}\n`);
};
