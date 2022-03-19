const express = require("express");
// const admin_mod = require("./admin_router");
const user_mod = require("./user_router");
const app = express();
const body_parser = require("body-parser");
const user_data = require("./user.json");
const session = require('express-session');

app.use(body_parser.json());
app.use(session({secret: "mySession", resave: true, saveUninitialized: false}));

app.get("/", (req, res) => {
    res.send("Home page");
});

app.post("/", (req, res) => {
    user_data.find( e => {
        if(e.email == req.body.email) {
            if(e.password == req.body.password) {
                req.session.user = { user_id: e.user_id, role: e.role };
                console.log("create", req.session);
                res.send(`login success (${e.role})`);
                return e.password == req.body.password;
            } else res.send("login failed");
        }
    });
});


// app.use(admin_mod.router);
app.use(user_mod.router);

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("logout");
});

app.listen(8000, () => {
    console.log(`server run on port: ${8000}`);
});

