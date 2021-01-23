let text = 'Aconteceu algo de errado :('

let notification = function(bot, msg, texto = text) {

  bot.sendMessage(msg.chat.id, texto,
  {reply_to_message_id: msg.message_id});
}

module.exports = notification;
