const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path'); 
const { exec } = require('child_process')


const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname ,'public'))); 

//Setting storage settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
}); 

app.post("/api/upload", upload.single('file'), (req, res) => {  
    const scriptPath = path.join(__dirname, "../scripts/fileExists.sh");
    const filePath = path.join(__dirname, "../uploads/" + req.file.originalname) 

    try {
        if(req.file){
            exec(`bash ${scriptPath} "${filePath}"`, (error, stdout, stderr) => {
                if(error){
                    console.log("couldnt run")
                } else {
                    console.log("ran successfully")
                    console.log(`Output: ${stdout}`)
                }
            }) 
        } 
        res.json({ message: "File was uploaded" })
    } catch(e) {
        console.log(e.message)
        res.status(501)
    }
    
})

const ip = '0.0.0.0'
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(path.join(__dirname, "../config/server.js"));
});