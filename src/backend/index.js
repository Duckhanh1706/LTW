const express = require("express");
const cors = require("cors");
const routes = require("./route");

const app = express();
const PORT = 8080;

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
