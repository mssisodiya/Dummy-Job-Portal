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
    unique: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
  resume: {
    type: String,
  },
});

const JobApplied = mongoose.model("JobApplied", ApppliedJobSchema);

function validateJobApplied(job) {
  const schema = {
    name: Joi.string().max(50).required(),
    email: Joi.string().required().email(),
    phone: Joi.number().min(10).required(),
    qualification: Joi.string().required(),
    jobId: Joi.string().required(),
    jobseekerId: Joi.string().required(),
    employerId: Joi.string().required(),
    resume: Joi.string(),
  };

  return Joi.validate(job, schema);
}

exports.JobApplied = JobApplied;
exports.jvalidate = validateJobApplied;
