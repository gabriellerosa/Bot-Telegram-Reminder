/* 	RODAR O MONGO
	1) mongod  [Pra rodar o server do mongodb]
	2) mongo [Pra rodar o mongo shell]

	BRINCAR NO MONGO
	Commands :
	show dbs - Mostrar os bancos existentes
	use nome_do_banco - Troca para o banco que vc colocou o nome
	show collections - Mostrar os models do bd
	db.nomeDoModel.funçao - Chamar as funções para determinado model dentro de um db
	ex: db.nomeDoModel.find() - mostra todos os dados que estão dentro desse model
*/

// Importando a biblioteca que contém uma API para criar um bot
const TelegramBot = require('node-telegram-bot-api');
// Importando a biblioteca que vai armazenar as variaveis de ambiente :D
const dotenv = require('dotenv');
// Importanto o moongose :p
const mongoose = require('mongoose');
// Importando o model Reminder
const reminderModel = require('./models/reminder-model');
// Importando o service Reminder
const reminderService = require('./services/reminder-service');
const errorsHandler = require('./errors-handler/handlers');

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

reminderService.setBot(bot);
errorsHandler.setBot(bot);
/*bot.on('message', (msg) => {

	var Hi = "hi";

	if(msg.text.toString().toLowerCase().indexOf(Hi) === 0){
		bot.sendMessage(msg.chat.id, "Hello world!");
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
});*/
