const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employer = require("./routes/employers");
const jobSeeker = require("./routes/jobSeekers");
const jobPost = require("./routes/jobPost");
const auth = require("./routes/auth");
const config = require("config");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

if (!config.get("jwtPrivatekey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/jobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Can not connect with mongodb"));

app.use(cors());
app.use(express.json());
app.use("/api/jobseeker", jobSeeker);
app.use("/api/employer", employer);
app.use("/api/jobpost", jobPost);
app.use("/api/auth", auth);
app.use(helmet());
app.use(compression());
const port = 8000;
app.listen(port, () => console.log(`Listening on ${port}`));
