// server.js

var express = require('express'); // includes express
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'hororay!'});
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);