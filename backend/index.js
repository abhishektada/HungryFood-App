const express = require("express");
const db = require("./mongoCon");
db();
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(express.json());
app.use("/auth", require("./routes/createUser"));
app.use("/home", require("./routes/loadData"));
app.use("/home", require("./routes/OrderData"));
app.use("/seller", require("./routes/item"));

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
