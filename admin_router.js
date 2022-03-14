const express = require("express");
const tools = require("./tools");
const user_data = require("./user.json");
const app = express();
const router = express.Router();

router.get("/admin", (req, res) => {
    res.send(user_data);
});

router.get("/admin/:id", (req, res) => {
    const disp = tools.display_func(req.params.id);
    res.send(disp);
});

router.post("/admin", (req, res) => {
    tools.create_func(req.body);
    res.send("User Created");
});

router.put("/admin/:id", (req, res) => {
    const upd = tools.update_func(req.body, req.params.id);
    res.send(upd);
});

router.delete("/admin/:id", (req, res) => {
    const del = tools.delete_func(req.params.id);
    res.send(del);
});

exports.router = router;