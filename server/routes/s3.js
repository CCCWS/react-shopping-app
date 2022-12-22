const express = require("express");
const app = express.Router();

app.post("/test", (req, res) => {
  console.log(req.body);

  return res.status(200).json({ success: true, id: 1 });

  
});

module.exports = app;
