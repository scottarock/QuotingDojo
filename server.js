const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      formatter = require('./modules/dateFormatter'),
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      port = process.env.PORT || 8000,
      app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/quotes',
  { useNewUrlParser: true }
);

let errMessages = [];

// create the quote schema
const quoteSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name should be at least 2 characters long'],
  },
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true,
  },
}, { timestamps: true });
// add a formatted date/time to the found quotes
quoteSchema.post('find', results => {
  for ( result of results ) {
    result.formattedDate = formatter.formatDate(result.createdAt);
  }
});
// register the model
const Quote = mongoose.model('Quote', quoteSchema);

// set up the application
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));

// routes for the app
app.get('/', function(request, response) {
  console.log(errMessages);
  response.render('index', { messages: errMessages });
  errMessages = [];
});

app.get('/quotes', function(request, response) {
  Quote.find({}).sort('-createdAt')
    .then(quotes => response.render('quotes/index', { quotes }))
    .catch(console.log);
});

app.post('/quotes', function(request, response) {
  Quote.create(request.body)
    .then(quote => {
      response.redirect('/quotes');
    })
    .catch(error => {
      errMessages = Object.keys(error.errors)
        .map(key => error.errors[key].message);
      response.redirect('/');
    });
});

// start app listening for clients
app.listen(port, console.log(`quoting app listening on port ${port}`));
