const app = require('express')();

//  Connect all our routes to our application
var routes = require('./routes')(app);

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});