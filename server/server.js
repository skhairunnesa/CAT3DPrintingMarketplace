const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/.enviro" });
const fileRoutes = require('./routes/fileRoutes');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const catalogRouter = require('./routes/catalog');
const productRouter = require('./routes/product');
// get driver connection

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use('/api/files', fileRoutes);

require("./routes/auth.js")(app);
require('./routes/google-oauth.js')(app);

app.use('/catalog', catalogRouter);
app.use('/product', productRouter);
