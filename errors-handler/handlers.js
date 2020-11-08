const handlers = module.exports = {}

// Declarando o método que injeta o bot do app.js no handlers
handlers.setBot = function(bot) {
	this.bot = bot;
	this.init();
}

handlers.init = function(){
	this.bot.on("polling_error", (error) => {
    console.log("Polling error:")
    console.log(error);
  })
}
