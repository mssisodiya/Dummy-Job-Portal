const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { JobSeeker, validate } = require("../models/jobseeker");

router.post("/", async (req, res) => {
  console.log("req", req);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details.message);

  let checkUser = await JobSeeker.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("User already registered");

  jobseeker = new JobSeeker(
    _.pick(req.body, [
      "name",
      "email",
      "phone",
      "password",
      "role",
      "qualification",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  jobseeker.password = await bcrypt.hash(jobseeker.password, salt);
  await jobseeker.save();

  const token = jobseeker.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(jobseeker, ["_id", "name", "email", "role"]));
});

module.exports = router;
