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

require('./server/config/routes')(app);

// start app listening for clients
app.listen(port, console.log(`quoting app listening on port ${port}`));
