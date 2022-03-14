const express = require("express");
const fs = require("fs");
const app = express();
const router = express.Router();
const user_data = require("./user.json");

router.get("/admin", (req, res) => {
    res.send(user_data);
});

router.post("/admin", (req, res) => {
    console.log(req.body);
    create_func(req.body);
    
    console.log(user_data);
    res.send({method: "post"});
});

router.put("/admin/:id", (req, res) => {
    res.send({method: "put"});
});

router.delete("/admin/:id", (req, res) => {
    res.send({method: "delete"});
});

const create_func = (data) => {
    user_data.push(data);
    const json_data = JSON.stringify(user_data);
    upload_func(json_data);
}

const upload_func = (data) => {
    fs.writeFile("user.json", data, (err) => {
        if(err) throw err;
        console.log("user created");
    });
}

// const readData = fs.createReadStream(mypath);
//     readData.on("data", (d) => {
//         d = d.toString();
//         d = d.replace(/Loan Calculator/,"My Loan Calculator");
//         res.send(d);
//     });

exports.router = router;