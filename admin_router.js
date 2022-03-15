const express = require("express");
const tools = require("./tools");
const user_data = require("./user.json");
const app = express();
const router = express.Router();

router.get("/admin", (req, res) => {
    if(req.session.user.role == "admin") res.send(user_data);
    else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

router.get("/admin/:id", (req, res) => {
    if(req.session.user.role == "admin") {
        const disp = tools.display_func(req.params.id);
        res.send(disp);
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

router.post("/admin", (req, res) => {
    if(req.session.user.role == "admin") {
        tools.create_func(req.body);
        res.send("User Created");
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

router.put("/admin/:id", (req, res) => {
    if(req.session.user.role == "admin") {
        const upd = tools.update_func(req.body, req.params.id);
        res.send(upd);
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

router.delete("/admin/:id", (req, res) => {
    if(req.session.user.role == "admin") {
        const del = tools.delete_func(req.params.id);
        res.send(del);
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

exports.router = router;