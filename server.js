const express = require("express");
const moment = require("moment");
const bodyParser = require("body-parser");
const app = express();

app.listen(3333, () => {
    console.log("Application started and Listening on port 3333");
});

app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
let arrary = [];
app.post("/", (req, res) => {
    try {
        arrary = [];
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        var tempStartDate = startDate;
        magicTime(tempStartDate, endDate);
        res.send({ res: arrary })
    }
    catch (err) {
        res.status(400).send({ err: err });
    }


});

function magicTime(stDate, enDate) {
    if (stDate.getTime() < enDate.getTime()) {
        var date = moment(stDate).format('hhmmss');
        var dateArray = date.split('');
        let uniqueValue = dateArray.filter((element, index, dateArray) => { return dateArray.indexOf(element) === index; })
        if (uniqueValue.length == 2) {
            arrary.push(stDate);
            console.log("Magical Time : " + stDate);
        }
        stDate.setSeconds(stDate.getSeconds() + 1);
        magicTime(stDate, enDate);
    }
}