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

var conn = mongoose.connect('mongodb://localhost/getwork');

router.route('/joboffers').post(function(req, res) {
	var job = new JobPosting();
	var coords = req.body.coords.split(',').map(Number);
	var expiretime = req.body.expiretime;
	
	/* sets the job informationf or the object from post data */
	job.JobTitle = req.body.title;
	job.JobDescription = req.body.desc;
	job.loc = [coords[0], coords[1]];
	job.JobPostDate = Date();
	job.JobFilled = false;
	job.JobExpireDate = new Date(expiretime);
	job.JobPay = req.body.pay;
	job.JobBossID = req.body.jobbossid;
	job.JobID = req.body.jobis;

	job.save(function(err) {
		if (err)
			res.send(err);

		res.json({message: "Job created!"}); // job save success
	});

})
.get(function(req, res) { // dump all the jobs
	JobPosting.find(function(err, jobs) {
		if (err)
			res.send(err);
		res.json(jobs)
	});
});

router.route('/getoffers').post(function(req, res) { // post offer
	var job = new JobPosting();
	var distance = req.body.distance;
	var coords = req.body.coords.split(',').map(Number);

	JobPosting.find({ // find the job offers based on curloc and 
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
			console.log(err);
			return res.json(500, err);
		}
		res.json(jobs);
	});

});

app.use('/api', router);













