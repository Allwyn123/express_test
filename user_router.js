const express = require("express");
const tools = require("./tools");
const user_data = require("./user.json");
const app = express();
const router = express.Router();

router.get("/user", (req, res) => {
    if(req.session.user.role == "user") {
        const disp = tools.display_func(req.session.user.user_id);
        res.send(disp);
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

router.put("/user", (req, res) => {
    if(req.session.user.role == "user") {
        const upd = tools.update_func(req.body, req.session.user.user_id);
        res.send(upd);
    } else {
        res.statusCode = 401;
        res.send(res.statusCode);
    }
});

exports.user_router = router;