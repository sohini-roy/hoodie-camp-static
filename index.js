var express = require('express')
var bodyParser = require('body-parser')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendfile('public/index.html')
})

app.use(express.static('public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
