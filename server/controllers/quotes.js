const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote');

let errMessages = [];

module.exports = {

  index: function(request, response) {
    response.render('index', { messages: errMessages });
    errMessages = [];
  },

  getQuotes: function(request, response) {
    Quote.find({}).sort('-createdAt')
      .then(quotes => response.render('quotes/index', { quotes }))
      .catch(console.log);
  },

  addQuote: function(request, response) {
    Quote.create(request.body)
      .then(quote => {
        response.redirect('/quotes');
      })
      .catch(error => {
        errMessages = Object.keys(error.errors)
          .map(key => error.errors[key].message);
        response.redirect('/');
      });
  }

}
