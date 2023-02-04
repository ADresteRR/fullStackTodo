const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const PORT = 3000;

const items = [];

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.post("/", (req, res) => {
    // res.send("message send sucessfully");
    items.push(req.body.newItem);
    res.redirect("/");

})
app.get("/", (req, res) => {
    let date = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    res.render('index', { todayDate: date.toLocaleString("en-IN", options), newItems: items });

})



app.listen(PORT, () => console.log(`server is working on ${PORT}`));