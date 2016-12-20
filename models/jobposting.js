var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobPostingSchema = new Schema({
	JobTitle: String,
	JobDescription: String,
	JobExpireDate: Date,
	JobPostDate: Date,
	JobPay: String,
	JobBossID: Number,
	JobFilled: Boolean,
	loc: { type: [Number], index: '2dsphere'}
});

JobPostingSchema.index({ loc : '2dsphere' });
module.exports = mongoose.model('JobPosting', JobPostingSchema);