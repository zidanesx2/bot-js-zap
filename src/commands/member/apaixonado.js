const { PREFIX } = require (`${BASE_DIR}/config`);

module.exports = {
    name: "ApaixonadoMeter",
    description: "medir uma porcentagem de quanto apaixonado voce e",
    commands: ["apaixonado"],
    usage: `${PREFIX}apaixonado`,
    handle: async ({ sendReact, sendReply }) => {
        const randomPercentage = Math.floor(Math.random() * 101); // 0-100
        await sendReact("😍");
        await sendReply(`😍 *voce e ${randomPercentage}% apaixonado* 😍`)

    }
    
};
