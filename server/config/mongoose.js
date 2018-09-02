const mongoose = require('mongoose'),
      { Schema } = mongoose,
      path = require('path'),
      fs = require('fs');

let models_path = path.join(__dirname, '../models');

module.exports = function() {

  mongoose.Promise = global.Promise;
  mongoose.connect(
    'mongodb://localhost:27017/quotes',
    { useNewUrlParser: true }
  );

  fs.readdirSync(models_path).forEach( file => {
    if( file.indexOf('.js') >= 0 ) {
      require(`${models_path}/${file}`);
    }
  });

  require('../../server/models/quote')();

}
