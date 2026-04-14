const express = require("express");
const cors = require("cors");
const routes = require("./routes/PostRouter");
const dbConnect = require("./data/dbConnect");

const app = express();
const PORT = 8080;

dbConnect();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
