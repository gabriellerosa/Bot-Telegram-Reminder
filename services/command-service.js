// Aqui ficar como fazer o \commands do bot

// Exportando o command-service
const command = module.exports = {}

// Declarando o método que injeta o bot do app.js no reminder-service
command.setBot = function(bot) {
	this.bot = bot;

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `Bem vinda(o), \n\n` +
        `para enviar um lembrete basta dar **reply** no que você quer se lembrar e seguir o seguinte padrão : *!lembrete ?h ?m ?s* \n` +
        `Não é necessário ter todos os três atributos, mas é importante estar separado por espaços.\n\n` +
        `Resumindo os exemplos abaixo são aceitos:\n` +
        `!lembrete 10h 5m 1s\n` +
        `!lembrete 2h 30m\n` +
        `!lembrete 33m\n` +
        `!lembrete 45s` +
				`\n\n` +
				`Mas se você quiser ser lembrada(o) todos os dias no mesmo horário basta seguir o seguinte padrão : \n *!diario ?h ?m QUALQUER TEXTO AQUI* \n` +
				`É necessário ter as horas e os minutos e a mensagem (NESSA ORDEM) como exemplo abaixo: \n` +
				`!diario 13h 00m tudo bem amigo ? Você vem sempre aqui \n` +
				`!diario 18h 51m Me lembre de tomar meu remédio pra calvice \n` +
				`\n\n` +
				`Se esqueceu quais são os seus lembretes diários, basta enviar uma mensagem com o seguinte texto: *!listar*` +
				`\n\n` +
				`Você pode excluir os lembretes diários usando o texto *!excluir* \n` +
				`Então se você escreveu errado, não se preocupe, siga os passos abaixo para deletar \n` +
				`* 1) * Liste os seus lembretes diários com o comando *!listar* \n` +
				`* 2) * Use o comando *!excluir ID_LEMBRETE_QUE_DESEJA_EXCLUIR* \n\n` +
		 		`Obs: O ID do lembrete é o número que aparece na frente das mensagems quando você as lista.`,
				{parse_mode : "Markdown"});
  });
}
