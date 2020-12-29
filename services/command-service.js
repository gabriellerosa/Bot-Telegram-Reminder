// Aqui ficar como fazer o \commands do bot

// Exportando o command-service
const command = module.exports = {}

// Declarando o método que injeta o bot do app.js no reminder-service
command.setBot = function(bot) {
	this.bot = bot;

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `Bem vinda(o), \n\n` +
        `para enviar um lembrete basta dar <b>reply</b> no que você quer se lembrar e seguir o seguinte padrão : <b>!lembrete ?h ?m ?s</b>\n` +
        `Não é necessário ter todos os três atributos, mas é importante estar separado por espaços.\n\n` +
        `Resumindo os exemplos abaixo são aceitos:\n` +
        `!lembrete 10h 5m 1s\n` +
        `!lembrete 2h 30m\n` +
        `!lembrete 33m\n` +
        `!lembrete 45s`, {parse_mode : "HTML"});
  });
}
