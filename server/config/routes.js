// routes for the quoting dojo app
const quotes = require('../controllers/quotes');

module.exports = function(app) {

  app.get('/', function(request, response) {
    quotes.index(request, response);
  });

  app.get('/quotes', function(request, response) {
    quotes.getQuotes(request, response);
  });

  app.post('/quotes', function(request, response) {
    quotes.addQuote(request, response);
  });
  
}
