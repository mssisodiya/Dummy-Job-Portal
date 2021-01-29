const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const jobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: Number,
  },
});

jobSeekerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, "jwtPrivateKey");
  return token;
};
const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

function validateJobseeker(jobseeker) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    qualification: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.number(),
  };

  return Joi.validate(jobseeker, schema);
}

exports.JobSeeker = JobSeeker;
exports.validate = validateJobseeker;
