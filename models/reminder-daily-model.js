const mongoose = require('mongoose');

// Criando o schema que é o molde para o modelo do Lembrete
const schema = new mongoose.Schema({
	groupId: Number,
	reminder_time: Number,
	id_pessoa: Number,
	nome_pessoa: String,
  texto: String
});

// Criando o modelo do lembrete
const reminder = mongoose.model('Reminder_daily', schema);

// Exportando o modulo
module.exports = reminder;
