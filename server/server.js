const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/.enviro" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// get driver connection

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

require("./routes/auth.js")(app);
require('./routes/google-oauth.js')(app);