const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ApppliedJobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  jobId: {
    type: String,
    required: true,
  },

  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },

  jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
  },
});

const JobApplied = mongoose.model("JobApplied", ApppliedJobSchema);

function validateJobApplied(job) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().required(),
    qualification: Joi.string().required(),
    jobId: Joi.string().required(),
    jobseekerId: Joi.string().required(),
    employerId: Joi.string().required(),
  };

  return Joi.validate(job, schema);
}

exports.JobApplied = JobApplied;
exports.validate = validateJobApplied;