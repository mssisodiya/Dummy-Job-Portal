const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const { Employer } = require("../models/employer");
const { JobSeeker } = require("../models/jobseeker");

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details.message);
  console.log("hitted2");
  let user =
    (await Employer.findOne({ email: req.body.email })) ||
    (await JobSeeker.findOne({ email: req.body.email }));
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
