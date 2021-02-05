const express = require("express");
const router = express.Router();
const _ = require("lodash");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.jobPortal_sgMailKey);

const { Acceptedappl, avalidate } = require("../models/acceptedAppl");
// Accept application
router.post("/acceptAppl", async (req, res) => {
  try {
    const { error } = avalidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let checkUser = await Acceptedappl.findOne({ jobId: req.body.jobId });
    if (checkUser) {
      return res.status(400).send("Already accepted this Appliction");
    }

    applcn = new Acceptedappl({
      applicantId: req.body._id,
      name: req.body.name,
      post: req.body.post,
      email: req.body.email,
      phone: req.body.phone,
      qualification: req.body.qualification,
      jobseekerId: req.body.jobseekerId,
      jobId: req.body.jobId,
      resume: req.body.resume,
      employerId: req.body.employerId,
    });
    // const { error } = avalidate(applcn);
    // if (error) return res.status(400).send(error.details[0].message);

    await applcn.save();

    const emailData = {
      from: "mssisodiya@bestpeers.com",
      to: applcn.email,
      subject: `Acknowledgement`,
      text: `Congratulations ${applcn.name} You resume has been shortListed for the post ${applcn.post} `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        console.log("sent");
      })
      .catch((err) => {
        console.log("not sent");
      });
    res.send(applcn);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
