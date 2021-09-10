const express = require('express');
var cron = require('node-cron');
var axios = require('axios');

const fs = require("fs");

const app = express();
const port = 3000;

const take = async url => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

const write = async data => {
    const jsonString = JSON.stringify(data)

    fs.writeFileSync('common/test.json', jsonString);
}

cron.schedule("*/20 * * * * *", async function() {
    //toplist = new Date();
    console.log('misko');
    const data = await take('http://127.0.0.1:8000/test');
    console.log(data);
    write(data);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname +"/page/index.html");
})

app.use(express.static('common'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})