const express = require("express");
const htmlRoutes = require("./routes/html-routes.js");
const apiRoutes = require("./routes/api-routes.js");
const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(apiRoutes);
app.use(htmlRoutes);



app.listen(PORT, function () {
    console.log("http://localhost:"  + PORT);
  });