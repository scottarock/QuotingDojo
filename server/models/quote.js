const mongoose = require('mongoose'),
      { Schema } = mongoose;

function formatDate(date) {

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime + " " + monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() ;
}

module.exports = function() {


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
      result.formattedDate = formatDate(result.createdAt);
    }
  });
  // register the model
  const Quote = mongoose.model('Quote', quoteSchema);

}
