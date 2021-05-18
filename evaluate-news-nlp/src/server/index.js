var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
dotenv.config();

const APIKey = process.env.API_KEY;
const baseURl = 'https://api.meaningcloud.com/sentiment-2.1'

const app = express()

app.use(express.static('dist'))

console.log(__dirname)
console.log(`Your API key is ${process.env.API_KEY}`);


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
