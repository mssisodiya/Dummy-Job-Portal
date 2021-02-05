const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
var multer = require("multer");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.jobPortal_sgMailKey);

const { Employer, validate } = require("../models/employer");
const { JobPost } = require("../models/jobPost");
const { JobApplied } = require("../models/appliedjob");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let checkUser = await Employer.findOne({ email: req.body.email });
    if (checkUser)
      return res.status(400).send("User already registered with this email");

    employer = new Employer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role,
      logo: url + "/images/" + req.file.filename,
      address: req.body.address,
    });

    const emailData = {
      from: "mssisodiya@bestpeers.com",
      to: req.body.email,
      subject: `Welcome mail `,
      text: "Welcome to job portal you have been Registered succesfully",
    };

    const salt = await bcrypt.genSalt(10);
    employer.password = await bcrypt.hash(employer.password, salt);
    await employer.save();

    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log("SIGNUP EMAIL SENT");
        // return res.json({
        //   result: "warning",
        //   message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
        // });
      })
      .catch((err) => {
        // console.log("SIGNUP EMAIL SENT ERROR");
        // return res.json({
        //   result: "error",
        //   message: err.message,
        // });
      });
    const token = employer.generateAuthToken();

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(employer, ["_id", "name", "email", "role"]));
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employer = await Employer.find({ _id: req.params.id });
    const jobs = await JobPost.find({ employer: req.params.id });
    res.send({ employer, jobs });
  } catch (err) {
    res.json({ error: err.message });
  }
});

//company details
router.get("/cdetail/:id", async (req, res) => {
  try {
    const employer = await Employer.findOne({ _id: req.params.id });
    res.send(_.pick(employer, ["_id", "name", "email", "phone"]));
  } catch (err) {
    res.json({ error: err.message });
  }
});

//applications for an employer
router.get("/applications/:id", async (req, res) => {
  try {
    const applications = await JobApplied.find({
      employerId: req.params.id,
    }).populate({ path: "jobId" });
    res.send(applications);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//an aplication of an employer
router.get("/single_application/:id", async (req, res) => {
  try {
    const application = await JobApplied.find({ _id: req.params.id });
    const jobPost = await JobPost.findById(application[0].jobId);
    res.send({ application, jobPost });
  } catch (err) {
    res.json({ error: err.message });
  }
});

//  Accept/Reject an application
router.put("/changestatus/:id", async (req, res) => {
  try {
    let checkUser = await JobApplied.findOne({
      jobId: req.body.jobId,
      status: req.body.status,
    });
    if (checkUser) {
      return res.status(400).send(`Already ${req.body.status} this Appliction`);
    }
    const fil = { jobId: req.params.id };
    const upd = { status: req.body.status };
    const acceptedJob = await JobApplied.findOneAndUpdate(fil, upd, {
      new: true,
    });
    const emailData = {
      from: "mssisodiya@bestpeers.com",
      to: acceptedJob.email,
      subject: `Acknowledgement`,

      text:
        req.body.status === "Accepted"
          ? `Congratulations ${acceptedJob.name}, Your resume has been shortListed for the post ${req.body.post} at ${req.body.company} company`
          : `Hi ${acceptedJob.name}, This mail is to inform you that you are Rejected for post ${req.body.post} at ${req.body.company} company`,
    };
    sgMail
      .send(emailData)
      .then((sent) => {
        console.log("sent");
      })
      .catch((err) => {
        console.log("not sent");
      });

    res.send(acceptedJob);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
