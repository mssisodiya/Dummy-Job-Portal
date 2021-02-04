const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const AcceptedapplSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
  },
  applicantId: {
    type: String,
  },
  post: {
    type: String,
  },
  jobId: {
    type: String,
    unique: true,

    // required: true,
  },

  employerId: {
    type: String,
    // ref: "Employer",
  },

  jobseekerId: {
    type: String,
    // ref: "JobSeeker",
  },
  resume: {
    type: String,
  },
});

const Acceptedappl = mongoose.model("Acceptedappl", AcceptedapplSchema);

// function validateJobApplied(job) {
//   const schema = {
//     name: Joi.string().max(50).required(),
//     email: Joi.string().required().email(),
//     phone: Joi.number().min(10).required(),
//     qualification: Joi.string().required(),
//     jobId: Joi.string().required(),
//     jobseekerId: Joi.string().required(),
//     employerId: Joi.string().required(),
//     resume: Joi.string(),
//   };

//   return Joi.validate(job, schema);
// }

exports.Acceptedappl = Acceptedappl;
// exports.jvalidate = validateJobApplied;
