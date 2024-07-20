const express = require("express");
const multer = require("multer");
const fs = require("fs");
const upload = multer();
const app = express();
const port = 3000;

app.use("/file", express.static("/tmp"));

app.get("/upload-file", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/upload-file", upload.single("phile"), async (req, res) => {
  try {
    const file = req.file;
    fs.writeFileSync("/tmp/" + file.originalname, file.buffer);
    res.redirect("/upload-file");
  } catch (error) {
    res.json(error);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
