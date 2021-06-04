const dotenv = require('dotenv');
dotenv.config();

projectData= {};
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const APIKey = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))

console.log(__dirname)
//console.log(`Your API key is ${process.env.API_KEY}`);


app.get('/',(req, res)=>{
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

app.get('/api', (req, res) => {
    res.send({key: APIKey });
});

app.get('/get', (req, res) => {
    res.send(projectData);
});

app.post('/post', (req, res) => {
    newData = {
      subjective: req.body.subjectivity,
      confident: req.body.confindence,
      irony: req.body.irony
    }
    projectData = newData;
    res.send(projectData);
    res.send(mockAPIResponse);
});
