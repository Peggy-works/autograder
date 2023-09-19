const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/ping", (req, res) => {
    res.status(500).json({ error: "Internal server error" })
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(path.join(__dirname, "../config/server.js"));
});