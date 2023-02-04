const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");
const PORT = 3000;
const baseUrl = "mongodb://localhost:27017/todoListDB";
let items = [];

Mongoose.connect(baseUrl, { useNewUrlParser: true });
const todoSchema = Mongoose.Schema({
    task: String
});

const todoModel = Mongoose.model('todoList', todoSchema);


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

async function initialLoader() {
    try {
        const list = await todoModel.find({});
        items = [];
        list.forEach((ele) => {
            items.push(ele.task);
        })
    }
    finally {
        console.log("work done");
    }
}

async function addTask(taskObject) {
    try {

        const task1 = new todoModel({
            task: taskObject
        });
        await task1.save();

    }
    finally {
        // await Mongoose.connection.close();
        console.log("new item added!!")
    }
}

app.post("/", async (req, res) => {
    // res.send("message send sucessfully");
    // items.push(req.body.newItem);
    await addTask(req.body.newItem);
    res.redirect("/");

})

app.post("/delete", async (req, res) => {
    setTimeout(() => {
        todoModel.deleteOne({ task: req.body.itemName }, function (err) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("no error");
            }
        });
        res.redirect("/");
    }, 500);

})
app.get("/", async (req, res) => {
    let date = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    await initialLoader();
    res.render('index', { todayDate: date.toLocaleString("en-IN", options), newItems: items });

})



app.listen(PORT, () => console.log(`server is working on ${PORT}`));