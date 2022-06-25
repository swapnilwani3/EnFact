const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const fileuploader = require("express-fileupload");

const app = express();

dotenv.config();
app.use(fileuploader());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const PORT = process.env.PORT || 9000;

app.use("/ngo", require("./routes/ngo"));
app.use("/admin", require("./routes/admin"));
app.use("/factory", require("./routes/factory"));
app.use("/public", require("./routes/public"));

mongoose.connect(process.env.mongoDBUrl, () => {
  console.log(`Server is Upp! ${process.env.PORT}`);
  app.listen(PORT);
});
