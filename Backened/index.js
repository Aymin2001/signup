
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongo();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
//Available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/auth"));






app.listen(port, "192.168.0.109", () => {
  console.log(`FYP backend listening on port ${port}`);
});
