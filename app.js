
// Importando a biblioteca que contém uma API para criar um bot
const TelegramBot = require('node-telegram-bot-api');

// Importando a biblioteca que vai armazenar as variaveis de ambiente :D
const dotenv = require('dotenv');
dotenv.config();

// Pegando o token das variaveis de ambiente
const TOKEN = process.env.TOKEN;

// Criando o bot
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {

	var Hi = "hi";
	
	if(msg.text.toString().toLowerCase().indexOf(Hi) === 0){
		bot.sendMessage(msg.chat.id, "Hello world!");
	}

});

