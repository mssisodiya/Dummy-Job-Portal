const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
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

employerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, "jwtPrivateKey");
  return token;
};
const Employer = mongoose.model("Emloyer", employerSchema);

function validateEmployer(employer) {
  console.log(employer);
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(100).required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.number(),
  };

  return Joi.validate(employer, schema);
}

exports.Employer = Employer;
exports.validate = validateEmployer;
