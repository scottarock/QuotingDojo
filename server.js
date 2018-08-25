const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      port = process.env.PORT || 8000,
      app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/quotes',
  { useNewUrlParser: true }
);

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
const Quote = mongoose.model('Quote', quoteSchema);

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/quotes', function(request, response) {
  Quote.find({})
    .then(quotes => response.render('quotes/index', { quotes }))
    .catch(console.log);
});

app.post('/quotes', function(request, response) {
  console.log(request.body);
  Quote.create(request.body)
    .then(response.redirect('/quotes'))
    .catch(console.log);
});

app.listen(port, console.log(`quoting app listening on port ${port}`));
