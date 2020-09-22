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
		
		if(msg.text.toString().toLowerCase().indexOf(Hi) === 0){
			this.bot.sendMessage(msg.chat.id, "Hello world!");
		}

		const teste = new reminderModel({
			id_msg: msg.message_id,
			description: 'Me lembra de tirar o arroz do fogo',
			groupId: msg.chat.id,
			reminder_time: Date.now()
		});

		teste.save(function(err) {
			if(err) return console.log(err);
			else console.log('saved !');
		});
	});
}
