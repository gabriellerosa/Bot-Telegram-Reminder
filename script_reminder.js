

// Importando a biblioteca que contém uma API para criar um bot
const TelegramBot = require('node-telegram-bot-api');
// Importando a biblioteca que vai armazenar as variaveis de ambiente :D
const dotenv = require('dotenv');
// Importanto o moongose :p
const mongoose = require('mongoose');
const script = require('./services/script-service')

dotenv.config();

// Pegando as variaveis de ambiente
const TOKEN = process.env.TOKEN
const DB_URI = process.env.DB_URI
const PORT = process.env.PORT
const APP_URL = process.env.APP_URL

// Conectando com o banco
mongoose.connect(DB_URI, { useNewUrlParser: true }).catch(error => {
	console.log('Não conectei com o banco :c');
	console.log(error);
})

let bot;
// Se estiver no Heroku
if('PROD' in process.env) {

	const URL = APP_URL || 'https://reminder-me-senpai.herokuapp.com:443'
	const OPTIONS = {webHook: {port: PORT || 443}}
	bot = new TelegramBot(TOKEN, OPTIONS);
	bot.setWebHook(`${URL}/bot${TOKEN}`);

} else {
	// Criando o bot assim pois está no meu pc
	bot = new TelegramBot(TOKEN, {polling: true});
}

//1) CONECTAR NO BANCO DE DADOS
async function execute(){
    await script.execute(bot)

    // desconectar do bot
    setTimeout(() => { process.exit() }, 30000)
}

execute();
