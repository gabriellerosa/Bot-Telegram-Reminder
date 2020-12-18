const reminderModel = require('../models/reminder-model');

// Exportando o reminder-service
const reminder = module.exports = {}

// Declarando o método que injeta o bot do app.js no reminder-service
reminder.setBot = function(bot) {
	this.bot = bot;
	this.init();
}

// Declarando o método init
reminder.init = function(){
	this.bot.on('message', (msg) => {

		var Hi = "hi";

		if(msg.reply_to_message == null) {
			return;
		}

		if(msg.text.toLowerCase().indexOf("!lembrete") === 0) {
			//var segundos = msg.text[msg.text.length - 1];

		  let arrayWords = msg.text.split(' ');
			console.log(arrayWords);

			let date_lembrete = 0;
			// Data relacionada a mensagem original, a data do telegram vem em segundos por isso troquei pra Date.now()
			const date_original = Date.now();

			if(arrayWords.length > 1){
				 this.bot.sendMessage(msg.chat.id, "Daqui " + arrayWords[1] + " eu te lembro! ",
														{reply_to_message_id: msg.reply_to_message.message_id});

			   date_lembrete = (parseInt(arrayWords[1]) * 1000) + date_original;

				 // Salvar no banco de dados
				 const lembrete = new reminderModel({
					 	id_msg: msg.reply_to_message.message_id,
						groupId: msg.chat.id,
						reminder_time: date_lembrete
				 });

				 lembrete.save(function(err) {
		 				if(err)
							return console.log(err);
		 				else
							console.log('saved !');
		 		 });
			}
		}

		/*if(msg.text.toString().toLowerCase().indexOf(Hi) === 0){
			this.bot.sendMessage(msg.chat.id, "Hello world!");
		}*/

		/*const teste = new reminderModel({
			id_msg: msg.message_id,
			description: 'Me lembra de tirar o arroz do fogo',
			groupId: msg.chat.id,
			reminder_time: Date.now()
		});

		teste.save(function(err) {
			if(err) return console.log(err);
			else console.log('saved !');
		});*/
	});
}
