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
const cartRouter = require('./routes/addCart');
const structureRouter = require('./routes/structureRoutes');
const ordersRouter = require('./routes/ordersRoute');

require("./routes/auth.js")(app);
require('./routes/google-oauth.js')(app);
require("./routes/seller-edit.js")(app);

app.use('/api/files', fileRoutes);
app.use('/catalog', catalogRouter);
app.use('/product', productRouter);
app.use('/addCart', cartRouter);
app.use('/api/Structures', structureRouter);
app.use('/orders', ordersRouter);

// get driver connection
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
