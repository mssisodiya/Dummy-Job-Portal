const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
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
  const schema = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.number(),
    logo: Joi.string(),
  };

  return Joi.validate(employer, schema);
}

exports.Employer = Employer;
exports.validate = validateEmployer;
