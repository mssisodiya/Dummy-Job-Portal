const express = require("express");
const router = express.Router();
const _ = require("lodash");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.jobPortal_sgMailKey);

const { Acceptedappl } = require("../models/acceptedAppl");

// Accept application
router.post("/acceptAppl", async (req, res) => {
  try {
    applcn = new Acceptedappl({
      applicantId: req.body.appl._id,
      name: req.body.appl.name,
      post: req.body.jobPost.title,
      email: req.body.appl.email,
      phone: req.body.appl.phone,
      qualification: req.body.appl.qualification,
      jobseekerId: req.body.appl.jobseekerId,
      jobId: req.body.appl.jobId,
      resume: req.body.appl.resume,
      employerId: req.body.appl.employerId,
    });

    await applcn.save();

    const emailData = {
      from: "mssisodiya@bestpeers.com",
      to: applcn.email,
      subject: `Acknowledgement`,
      text: `Congratulations ${applcn.name} You resume has been shortListed for the post ${applcn.post} at ${req.body.jobPost.employer.company} company`,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        console.log("sent");
      })
      .catch((err) => {
        console.log("not sent");
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
