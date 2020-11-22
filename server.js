// Dependencies
const express = require("express");
const path = require('path');
const fs = require("fs");



//Start Express APP 
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(__dirname));


// Link to ROUTE Files
require('./api.js')(app);


// Start listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  