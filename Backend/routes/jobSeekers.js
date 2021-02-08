const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
var multer = require("multer");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.jobPortal_sgMailKey);

const { JobSeeker, validate } = require("../models/jobseeker");
const { JobApplied, jvalidate } = require("../models/appliedjob");
const { JobPost } = require("../models/jobPost");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
    const emailData = {
      from: "mssisodiya@bestpeers.com",
      to: req.body.email,
      subject: `Welcome mail `,
      text: "Welcome to job portal you have been Registered succesfully",
    };

    const salt = await bcrypt.genSalt(10);
    jobseeker.password = await bcrypt.hash(jobseeker.password, salt);
    await jobseeker.save();

    sgMail
      .send(emailData)
      .then((sent) => {
        console.log("SIGNUP EMAIL SENT");
      })
      .catch((err) => {
        console.log("SIGNUP EMAIL SENT ERROR");
      });

    const token = jobseeker.generateAuthToken();

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(jobseeker, ["_id", "name", "email", "role"]));
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobseeker = await JobSeeker.find({ _id: req.params.id });
    // const jobs = await JobPost.find({ employer: req.params.id });
    res.send(jobseeker);
  } catch (err) {
    res.json({ error: err.message });
  }
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

//aplplying
router.post("/apply/:id", upload.single("resume"), async (req, res) => {
  // const job = await JobPost.find({ _id: req.params.id });
  try {
    const { error } = jvalidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let checkUser = await JobApplied.findOne({
      jobId: req.body.jobId,
      jobseekerId: req.body.jobseekerId,
    });

    if (checkUser) {
      return res.status(400).send("You have already Applied for this Job");
    }
    const url = req.protocol + "://" + req.get("host");
    jobApplication = new JobApplied({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      qualification: req.body.qualification,
      jobId: req.body.jobId,
      employerId: req.body.employerId,
      jobseekerId: req.body.jobseekerId,
      resume: url + "/images/" + req.file.filename,
      status: req.body.status,
    });
    await jobApplication.save();

    res.send(jobApplication);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/getApliedjobs/:id", async (req, res) => {
  try {
    const appliedJobs = await JobApplied.find({
      jobseekerId: req.params.id,
    }).populate({ path: "jobId" });

    res.send(appliedJobs);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appliedJobs = await JobApplied.findByIdAndRemove(req.params.id);
    // const jobpost = await JobPost.findById(jobseeker.jobId);
    res.send(appliedJobs);
  } catch (err) {
    res.json({ error: err.message });
  }
});
module.exports = router;
