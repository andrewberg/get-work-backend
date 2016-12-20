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
	geo: { type: [Number]}
});

JobPostingSchema.index({ loc : '2dsphere' });
module.exports = mongoose.model('JobPosting', JobPostingSchema);