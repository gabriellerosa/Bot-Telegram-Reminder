const reminderModel = require('../models/reminder-model');

const script = module.exports = {}

script.execute = async function(bot) {

  var currentDate = Date.now()
  console.log(currentDate)
  var dates = await reminderModel.find({reminder_time: { $lte: currentDate} })

  console.log(dates)
  //2) PEGAR OS LEMBRETES QUE JÁ PASSARAM DA HORA ATUAL
  dates.forEach((objReminder) => {
    //3) ENVIAR ELES POR MSG
    bot.sendMessage(objReminder.groupId, 'Você ainda se lembra disso né ' + '[ ' +  objReminder.nome_pessoa + ' ]' + '(tg://user?id=' + objReminder.id_pessoa + ')' + ' ??!', {reply_to_message_id: objReminder.id_msg, parse_mode:'Markdown'})
  })

  //4) EXCLUIR OS ENVIADOS DO BANCO DE DADOS
  await reminderModel.deleteMany({reminder_time: { $lte: currentDate} })

}
