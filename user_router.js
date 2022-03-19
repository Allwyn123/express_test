const express = require("express");
const tools = require("./tools");
const user_data = require("./user.json");
const router = express.Router();

router.get("/user", (req, res) => {
    if(req.session.user) {
        if(req.session.user.role == "admin") res.send(user_data);
        else if(req.session.user.role == "user") {
            const disp = tools.display_func(req.session.user.user_id);
            res.send(disp);
        } else res.sendStatus(404);
    } else res.sendStatus(401);
});

router.get("/user/:id", (req, res) => {
    if(req.session.user) {
        if(req.session.user.role == "admin") {
            const disp = tools.display_func(req.params.id);
            (disp) ? res.send(disp) : res.send("Not Found");
        } else res.sendStatus(401);
    } else res.sendStatus(401);
});

router.post("/user", (req, res) => {
    if(req.session.user) {
        if(req.session.user.role == "admin") {
            const cre = tools.create_func(req.body);
            res.send(cre);
        } else res.sendStatus(401);
    } else res.sendStatus(401);
});

router.put("/user", (req, res) => {
    if(req.session.user) {
        const role_user = req.session.user.role == "user";
        const role_admin = req.session.user.role == "admin";

        if(role_user || role_admin) {
            const upd = tools.update_func(req.body, req.session.user.user_id);
            res.send(upd);
        } else res.sendStatus(401);
    } else res.sendStatus(401);
});

router.put("/user/:id", (req, res) => {
    if(req.session.user) {
        if(req.session.user.role == "admin") {
            const upd = tools.update_func(req.body, req.params.id);
            res.send(upd);
        } else res.sendStatus(401);
    } else res.sendStatus(401);
});

router.delete("/user/:id", (req, res) => {
    if(req.session.user) {
        if(req.session.user.role == "admin") {
            const del = tools.delete_func(req.params.id);
            (del) ? res.send(del) : res.send("User Not Found");
        } else res.sendStatus(401);
    } else res.sendStatus(401);
});

exports.router = router;