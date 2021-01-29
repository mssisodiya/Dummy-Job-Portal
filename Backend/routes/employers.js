const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
var multer = require("multer");

const { Employer, validate } = require("../models/employer");
const { JobPost } = require("../models/jobPost");
const { JobApplied } = require("../models/appliedjob");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("logo"), async (req, res) => {
  console.log("req", req.body);
  console.log("req", req.file);
  const url = req.protocol + "://" + req.get("host");
  console.log("url", url);
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details.message);

  let checkUser = await Employer.findOne({ email: req.body.email });
  if (checkUser)
    return res.status(400).send("User already registered with this email");

  employer = new Employer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: req.body.role,
    logo: url + "/uploads/" + req.file.filename,
    address: req.body.address,
  });

  const salt = await bcrypt.genSalt(10);
  employer.password = await bcrypt.hash(employer.password, salt);
  await employer.save();

  const token = employer.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(employer, ["_id", "name", "email", "role"]));
});

router.get("/:id", async (req, res) => {
  const employer = await Employer.find({ _id: req.params.id });
  const jobs = await JobPost.find({ employer: req.params.id });
  res.send({ employer, jobs });
});

//company details
router.get("/cdetail/:id", async (req, res) => {
  const employer = await Employer.findOne({ _id: req.params.id });
  res.send(_.pick(employer, ["_id", "name", "email", "phone"]));
});

//applications for an employer
router.get("/applications/:id", async (req, res) => {
  const applications = await JobApplied.find({
    employerId: req.params.id,
  }).populate("employer");
  res.send(applications);
});

//an aplication of an employer
router.get("/single_application/:id", async (req, res) => {
  const application = await JobApplied.findById(req.params.id).populate(
    "employer"
  );
  const jobPost = await JobPost.find({ _id: application.jobId });
  res.send({ application, jobPost });
});

module.exports = router;
