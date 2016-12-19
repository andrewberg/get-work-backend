var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobPostingSchema = new Schema({
	JobTitle: String,
	JobDescription: String
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);