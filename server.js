const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      app = express();


// set up the application
app.set('view engine', 'ejs');
app.set('views', path.resolve('client', 'views'));
app.use(express.static(path.resolve('client', 'static')));
app.use(parser.urlencoded({ extended: true }));

require('./server/config/mongoose')();
require('./server/config/routes')(app);

// start app listening for clients
app.listen(port, console.log(`quoting app listening on port ${port}`));
