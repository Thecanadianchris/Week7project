const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("notes app is alive");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});