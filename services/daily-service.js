const reminderDailyModel = require('../models/reminder-daily-model');

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

        let current_date = new Date();
        let date_lembrete = new Date(current_date.getFullYear(), current_date.getMonth(),
                                     current_date.getDate(), hour, min,
                                     0 , 0);

        // checar se o dia já passou e acrescentar um dia
        if(date_lembrete.getTime() < current_date.getTime()) {
          date_lembrete.setDate(date_lembrete.getDate() + 1);
        }

        let texto = arrayWords.slice(3).join(' ');
        // Salvar no banco de dados
				const lembrete = new reminderDailyModel({
					groupId: msg.chat.id,
					reminder_time: date_lembrete.getTime(),
					id_pessoa: msg.from.id,
					nome_pessoa: msg.from.first_name,
          texto: texto
				});

				lembrete.save(function(err) {
					if(err)
					return console.log(err);
					else
					console.log('saved !');
				});
      } else {
        this.bot.sendMessage(msg.chat.id, "Opaa! Você escreveu algo errado ai MALDÍTO :c",
        {reply_to_message_id: msg.message_id});
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
      //this.listar(msg);

    } else if (msg.text.toLowerCase().indexOf("!excluir") === 0) {
      //this.excluir(msg);

    }
  })

}
