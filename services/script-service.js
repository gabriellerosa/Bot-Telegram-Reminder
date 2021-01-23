const reminderCommonModel = require('../models/reminder-model');
const reminderDailyModel = require('../models/reminder-daily-model');

const script = module.exports = {}

script.commonReminder = async function(bot) {

  var currentDate = Date.now()
  var dates = await reminderCommonModel.find({reminder_time: { $lte: currentDate} })

  console.log(dates)
  //2) PEGAR OS LEMBRETES QUE JÁ PASSARAM DA HORA ATUAL
  dates.forEach((objReminder) => {
    //3) ENVIAR ELES POR MSG
    bot.sendMessage(objReminder.groupId, 'Você ainda se lembra disso né ' + '[ ' +  objReminder.nome_pessoa + ' ]' + '(tg://user?id=' + objReminder.id_pessoa + ')' + ' ??!', {reply_to_message_id: objReminder.id_msg, parse_mode:'Markdown'})
  })

  //4) EXCLUIR OS ENVIADOS DO BANCO DE DADOS
  await reminderCommonModel.deleteMany({reminder_time: { $lte: currentDate} })
}

script.dailyReminder = async function(bot) {

  var currentDateMili = Date.now()
  var dates = await reminderDailyModel.find({reminder_time: { $lte: currentDateMili} })
  console.log(dates)

  //2) PEGAR OS LEMBRETES QUE JÁ PASSARAM DA HORA ATUAL
  dates.forEach(async (objReminder) => {
    //3) ENVIAR ELES POR MSG
    bot.sendMessage(objReminder.groupId, 'Ei ' + '[' +  objReminder.nome_pessoa + ' ]' +
        '(tg://user?id=' + objReminder.id_pessoa + ')' + ',\n' +
        objReminder.texto,
        {parse_mode:'Markdown'})

    var currentDate = new Date(objReminder.reminder_time);
    currentDate.setDate( currentDate.getDate() + 1 );

    objReminder.reminder_time = currentDate.getTime();

    //4) EDITAR NOVA DATA NO BANCO
    await objReminder.save();
  })
}

script.execute = async function(bot) {

  this.commonReminder(bot);
  this.dailyReminder(bot);
}
