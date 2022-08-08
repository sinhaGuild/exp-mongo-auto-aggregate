require("dotenv").config();
require("colors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const PORT = process.env.PORT || 4001;

/** Initialize express with middleware ==> JSON, morgan & CORS */
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

/** Base Route */
// app.get("/", (req, res) => {
//   res.status(200).send(`<h1>I am the Server Page.</h1>`);
// });

app.use("/shinobi", require("./routes/shinobiRoutes"));

/** Start Server */
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on ${PORT}...`.magenta.italic)
    );
  } catch (error) {
    console.log(`Server failed with ${error}`.bgRed.bold);
  }
};

//invoke
start();
