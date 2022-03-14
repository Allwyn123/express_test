const express = require("express");
const admin_mod = require("./admin_router");
const app = express();
const body_parser = require("body-parser");
const user_data = require("./user.json");


app.use(body_parser.json());

app.get("/", (req, res) => {
    res.send("Home Page");    
});


app.use(admin_mod.router);
// app.get("/admin", (req, res) => {
//     res.send("hello");
// });

app.get("/user", (req, res) => {
    res.send(user_data);
});

app.listen(8000, () => {
    console.log(`server run on port: ${8000}`);
});


