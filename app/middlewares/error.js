// na vdd o error handling é um middleware normal, não uma rota.
// https://expressjs.com/en/starter/faq.html
/*module.exports = function(req,res) {
	res.status(404).render("erro");
};*/

// MELHORAR

let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
module.exports = function(app){
	app.use(ensureLoggedIn('/'), function(req, res, next){
			
		res.status(404).render('erro404');

	});

};