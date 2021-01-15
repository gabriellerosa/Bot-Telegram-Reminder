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

		if(msg.reply_to_message == null || msg.text == null) {
			return;
		}

		if(msg.text.toLowerCase().indexOf("!lembrete") === 0) {
			//var segundos = msg.text[msg.text.length - 1];

			let arrayWords = msg.text.split(' ');
			console.log(arrayWords);

			// Data relacionada a mensagem original, a data do telegram vem em segundos por isso troquei pra Date.now()
			const date_original = Date.now();

			if(arrayWords.length > 1){

				let date_lembrete_horas = 0;
				let date_lembrete_min = 0;
				let date_lembrete_sec = 0;
				let error = false;

				arrayWords.forEach((word, index) => {

					// É necessário pular a primeira casa, pois será a palavra ['!lembrete'] e queremos garantir que somente
					//as partes que tem possibilidade de ser numéricas sejam avaliadas. Por exemplo: 1m, 1s, 1h 1m e etc
					if(index === 0) {
						return;
					}

					let ultimoChar = word[word.length - 1];
					let tempo = parseInt(word.substr(0, word.length - 1), 10);

					if(isNaN(tempo)) {
						error = true;
						return;
					}

					if(ultimoChar === 'h') {
						date_lembrete_horas += tempo * 1000 * 60 * 60;

					} else if(ultimoChar === 'm') {
						date_lembrete_min += tempo * 1000 * 60;

					} else if(ultimoChar === 's') {
						date_lembrete_sec += tempo * 1000;
					}
				});

				if(error) {
					this.bot.sendMessage(msg.chat.id, "Opaa! Você escreveu algo errado ai :c",
					{reply_to_message_id: msg.message_id});
					return;
				}

				let date_lembrete = date_original + date_lembrete_min + date_lembrete_sec + date_lembrete_horas;

				this.bot.sendMessage(msg.chat.id, "Daqui " + msg.text.substr(10) + " eu te lembro! ",
				{reply_to_message_id: msg.reply_to_message.message_id});

				// Salvar no banco de dados
				const lembrete = new reminderModel({
					id_msg: msg.reply_to_message.message_id,
					groupId: msg.chat.id,
					reminder_time: date_lembrete,
					id_pessoa: msg.from.id,
					nome_pessoa: msg.from.first_name
				});

				lembrete.save(function(err) {
					if(err)
					return console.log(err);
					else
					console.log('saved !');
				});
			} else {
				this.bot.sendMessage(msg.chat.id, "Por favor, me diga daqui quanto tempo eu tenho que te lembrar",
				{reply_to_message_id: msg.message_id});
			}
		}

	});
}
