const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const { readdirSync } = require("fs");

require("dotenv").config();
const port = process.env.PORT;
const url = process.env.CONNECTION_STRING;

/* JSON */
app.use(express.json());

/* CORS */
/* let allowed = ["http://localhost:3000"];
function corsOptions(req, res) {
  let tmp;
  let origin = req.header("Origin");
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      useSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: false,
    };
  }
  res(null, tmp);
}
app.use(cors(corsOptions)); */
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Welcome to the desert of the real!");
});

readdirSync("./routes").map((route) => {
  return app.use("/api/v1", require(`./routes/${route}`));
});

/* CONNECTING TO DATABASE AND START SERVER */

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is listening at port: ${port}`);
    });
  } catch (err) {
    console.log(`Error connecting to database: ${err}`);
  }
};
start();
