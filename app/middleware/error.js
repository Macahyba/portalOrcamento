// na vdd o error handling é um middleware normal, não uma rota.
// https://expressjs.com/en/starter/faq.html
/*module.exports = function(req,res) {
	res.status(404).render("erro");
};*/

// MELHORAR

module.exports = function(app){
	app.get('*', function(req, res){
			
		res.status(404).render('erro404');

	});

};