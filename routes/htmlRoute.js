const path = require("path");

module.exports = function (p1) {
  p1.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  p1.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};
