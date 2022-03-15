const express = require("express");
const admin_mod = require("./admin_router");
const user_mod = require("./user_router");
const app = express();
const body_parser = require("body-parser");
const user_data = require("./user.json");
const session = require('express-session');

app.use(body_parser.json());
app.use(session({secret: "hello", resave: true, saveUninitialized: false}));

app.get("/", (req, res) => {
    let uid, urole;
    let user_valid = false;
    user_data.forEach(e => {
        if(e.email == req.query.email) {
            if(e.password == req.query.password) {
                uid = e.user_id;
                urole = e.role;
                user_valid = true; 
            }
        }
    });

    if(req.originalUrl != "/") {
        if(user_valid) {
            req.session.user = {user_id: uid, role: urole};
            if(urole == "admin") res.redirect("/admin"); 
            if(urole == "user") res.redirect("/user");
        } else res.send("User Not Nound");
    } else {
        res.send("Enter login query");
    }
});


app.use(admin_mod.router);
app.use(user_mod.user_router);

app.get("/logout", (req, res) => {
    console.log("logout");
    console.log(req.session);
    req.session.destroy();
    res.send("dfs");
});

app.listen(8000, () => {
    console.log(`server run on port: ${8000}`);
});


