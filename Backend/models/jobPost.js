const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  jobtype: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },

  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
});

jobPostSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};
const JobPost = mongoose.model("JobPost", jobPostSchema);

function validateJobPost(job) {
  console.log(job);
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    jobtype: Joi.string().required(),
    qualification: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.string().required(),
    id: Joi.string(),
  };

  return Joi.validate(job, schema);
}

exports.JobPost = JobPost;
exports.validate = validateJobPost;
