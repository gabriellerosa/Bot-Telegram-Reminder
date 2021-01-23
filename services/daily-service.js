const reminderDailyModel = require('../models/reminder-daily-model');
const notification = require('../errors-handler/standart-notification');
const moment = require('moment-timezone');

// Exportando o reminder-service
const reminder = module.exports = {}

// Declarando o método que injeta o bot do app.js no reminder-service
reminder.setBot = function(bot) {
	this.bot = bot;
	this.init();
}

reminder.adicionar = function(msg) {

      let arrayWords = msg.text.split(' ');
      let hour = parseInt(arrayWords[1].slice(0, -1), 10);
      let min = parseInt(arrayWords[2].slice(0, -1), 10);

      if(!isNaN(hour) && !isNaN(min)) {

        let current_date = moment.tz('America/Bahia')
        let date_lembrete = moment.tz('America/Bahia')
				date_lembrete.hour(hour)
				date_lembrete.minute(min)

        // checar se o dia já passou e acrescentar um dia
        if(date_lembrete.valueOf() < current_date.valueOf()) {
          date_lembrete.add(1, 'days');
        }

        let texto = arrayWords.slice(3).join(' ');
        // Salvar no banco de dados
				const lembrete = new reminderDailyModel({
					groupId: msg.chat.id,
					reminder_time: date_lembrete.valueOf(),
					id_pessoa: msg.from.id,
					nome_pessoa: msg.from.first_name,
          texto: texto
				});

				lembrete.save(err => {

					if(err)
						return console.log(err);
					else
						notification(this.bot, msg, 'Gotcha! :P')
						console.log('saved !');

				});
      } else {

				notification(this.bot, msg, 'Opaa! Você escreveu algo errado ai :c')
        return
      }
}

reminder.listar = async function(msg) {

  // 1) INDENTIFICAR QUAL PESSOA LISTOU
  let idPessoaListar = msg.from.id

  // 2) CHECAR NO BANCO SEUS LEMBRENTES DE DAILYS
  var dailies = await reminderDailyModel.find({id_pessoa: idPessoaListar})

  // 3) MOSTRAR A LISTA
  let response = ''

  dailies.forEach((daily, id) => {
    let date = moment.tz(daily.reminder_time, 'America/Bahia')
    let text = daily.texto.substr(0, 10)
    if(daily.texto.length > 10) {
      text += '...'
    }

    response += (id + 1).toString() + ' - ' + text + ' - ' + date.format('H:mm') + 'h\n'
  });

  this.bot.sendMessage(msg.chat.id, 'Aqui está sua lista ' + msg.from.first_name + ':\n' + response)
}

reminder.excluir = async function(msg) {

	//!excluir 5
	let arrayWords = msg.text.split(' ');
	let id = arrayWords[1];

	if(!isNaN(id)) {

		// 1) PEGAR O ID DE QUEM QUER EXCLUIR
		let idPessoaListar = msg.from.id;

		// 2) BUSCAR NO BANCO TODOS OS REMINDERS DA PESSOA
		var dailies = await reminderDailyModel.find({id_pessoa: idPessoaListar})

		// 3) EXCLUIR ESSE REMINDER SE EXISTIR
		if(id >= 1 && id <= dailies.length) {

			let lembreteExcluir = dailies[id - 1];

			try {
				await reminderDailyModel.deleteOne({_id: lembreteExcluir._id});
				notification(this.bot, msg, 'O lembrete ' + id + ' foi excluído com sucesso.')
			} catch (erro){
				notification(this.bot, msg, 'Não foi possível excluir.')
			}

		} else {
			notification(this.bot, msg, 'Opaa! Não existe esse id nos seus lembretes.')
			return;
		}

	} else {

		notification(this.bot, msg, 'Opaa! Você escreveu algo errado ai');
		return;
	}
}

reminder.init = function() {

  this.bot.on('message', (msg) => {

    if(msg.text == null) {
			return;
		}

    if(msg.text.toLowerCase().indexOf("!diario") === 0) {
      this.adicionar(msg);

    } else if (msg.text.toLowerCase().indexOf("!listar") === 0) {
      this.listar(msg);

    } else if (msg.text.toLowerCase().indexOf("!excluir") === 0) {
      this.excluir(msg);

    }
  })
}
