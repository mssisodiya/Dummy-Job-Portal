const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { JobPost, validate } = require("../models/jobPost");
const { Employer } = require("../models/employer");

router.post("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details.message);

  const employer = await Employer.findById(req.params.id);
  try {
    jobPost = new JobPost({
      title: req.body.title,
      jobtype: req.body.jobtype,
      qualification: req.body.qualification,
      salary: req.body.salary,
      location: req.body.location,
      employer: {
        id: employer._id,
        company: employer.name,
        logo: employer.logo,
      },
    });

    await jobPost.save();

    res.send(jobPost);
  } catch (e) {
    res.status(e);
  }
});

router.get("/", async (req, res) => {
  const jobPost = await JobPost.find();
  res.send(jobPost);
});

//get a job of an id
router.get("/job/:id", async (req, res) => {
  const jobPost = await JobPost.findById(req.params.id);
  res.send(jobPost);
});

//get all job of an employter
router.get("/:id", async (req, res) => {
  const jobPost = await JobPost.find({ "employer.id": req.params.id });
  res.send(jobPost);
});

router.put("/:id", async (req, res) => {
  const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body);
  res.send(jobPost);
});

router.delete("/:id", async (req, res) => {
  const jobPost = await JobPost.findByIdAndRemove(req.params.id);
  res.send(jobPost);
});

module.exports = router;