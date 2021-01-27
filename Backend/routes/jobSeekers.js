const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { JobSeeker, validate } = require("../models/jobseeker");
const { JobApplied } = require("../models/appliedjob");
const { JobPost } = require("../models/jobPost");

router.post("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const jobseeker = await JobSeeker.find({ _id: req.params.id });
  // const jobs = await JobPost.find({ employer: req.params.id });
  res.send(jobseeker);
});

//aplplying
router.post("/apply/:id", async (req, res) => {
  // const job = await JobPost.find({ _id: req.params.id });

  jobApplication = new JobApplied({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    qualification: req.body.qualification,
    jobId: req.params.id,
    employerId: req.body.employerId,
    jobseekerId: req.body.jobseekerId,
  });
  await jobApplication.save();

  res.send(jobApplication);
});

router.get("/getApliedjobs/:id", async (req, res) => {
  const jobseeker = await JobApplied.find({ jobseekerId: req.params.id });
  const job = await JobPost.findById(jobseeker.jobId);
  res.send({ jobseeker, job });
});

module.exports = router;
