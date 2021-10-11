const express = require('express');
var cron = require('node-cron');
var axios = require('axios');

const fs = require("fs");

const app = express();
const port = 3000;

const take = async url => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

const write = async data => {
    const jsonString = JSON.stringify(data)

    const previous = fs.readFileSync('common/test.json');

    fs.writeFileSync('common/previous.json', previous);

    fs.writeFileSync('common/test.json', jsonString);
}

cron.schedule("*/20 * * * * *", async function() {
    try {
        const data = await take('http://127.0.0.1:3333/test?token=miskodrakula');
        if (data) {
            write(data);
        }
    } catch (error) {
        console.log(error);
    }

});

app.get('/', (req, res) => {
    res.sendFile(__dirname +"/page/index.html");
})

app.use(express.static('common'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})