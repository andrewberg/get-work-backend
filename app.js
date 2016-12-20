const app = require('express')();
const mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
//  Connect all our routes to our application

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

var JobPosting = require('./models/jobposting');

// Turn on that server!
app.listen(3000);
console.log("Server started.");

mongoose.connect('mongodb://localhost/getwork');
//mongoose.connection.db.ensureIndex({ 'loc': '2dsphere'});

router.route('/joboffers').post(function(req, res) {
	var job = new JobPosting();
	var coords = req.body.coords.split(',').map(Number);
	var expiretime = req.body.expiretime;
	
	job.JobTitle = req.body.title;
	job.JobDescription = req.body.desc;
	job.geo = [coords[0], coords[1]];
	job.JobPostDate = Date();
	job.JobFilled = false;
	job.JobExpireDate = new Date(expiretime);
	job.JobPay = req.body.pay;
	job.JobBossID = req.body.jobbossid;

	job.save(function(err) {
		if (err)
			res.send(err);

		res.json({message: "Job created!"});
	});

})
.get(function(req, res) {
	JobPosting.find(function(err, jobs) {
		if (err)
			res.send(err);
		res.json(jobs)
	});
});

router.route('/getoffers').post(function(req, res) {
	var job = new JobPosting();
	var distance = req.body.distance;
	var coords = req.body.coords.split(',').map(Number);


	JobPosting.find({
		loc: {
			$near: {
				$geometry: {
					type: "Point",
					coordinates: coords
				},
				$maxDistance: distance
			}
		}

	}).limit(10).exec(function(err, jobs) {
		if (err) {
			return res.json(500, err);
		}
		res.json(jobs);
	});

});

app.use('/api', router);













