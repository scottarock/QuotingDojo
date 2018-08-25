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

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(port, console.log(`quoting app listening on port ${port}`));
