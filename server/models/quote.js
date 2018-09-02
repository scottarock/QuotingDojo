const mongoose = require('mongoose'),
      { Schema } = mongoose,
      formatter = require('./quoteDateFormatter');

module.exports = function() {

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

}
