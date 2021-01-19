const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { JobPost, validate } = require("../models/jobPost");
const { Employer } = require("../models/employer");

router.post("/:id", async (req, res) => {
  console.log("id", req.body);

  const employer = await Employer.findById(req.params.id);
  console.log("employer....", employer);

  jobPost = new JobPost({
    title: req.body.title,
    jobtype: req.body.jobtype,
    qualification: req.body.qualification,
    salary: req.body.salary,
    location: req.body.location,
    employer: employer._id,
  });
  await jobPost.save();

  res.send(jobPost);
});

router.get("/job/:id", async (req, res) => {
  const jobPost = await JobPost.findById(req.params.id);
  res.send(jobPost);
});

router.get("/:id", async (req, res) => {
  const jobPost = await JobPost.find({ employer: req.params.id });
  res.send(jobPost);
});
router.put("/:id", async (req, res) => {
  const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body);
  res.send(jobPost);
});

module.exports = router;
