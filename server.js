const express = require ("express");
const path = require ("path");
const fs = require("fs");


const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);

app.listen(PORT, function (){
    console.log("its working!")
});