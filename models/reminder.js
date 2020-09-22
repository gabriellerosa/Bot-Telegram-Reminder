const mongoose = require('mongoose');

// Criando o schema que é o molde para o modelo do Lembrete
const schema = new mongoose.Schema({ 
	id_msg: Number,
	description: String, 
	groupId: Number, 
	reminder_time: Date 
});

// Criando o modelo do lembrete
const reminder = mongoose.model('Reminder', schema);

// Exportando o modulo
module.exports = reminder;