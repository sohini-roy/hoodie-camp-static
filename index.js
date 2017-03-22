var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')

var app = express();

var options = {
  host: 'www.api.github.com'
  path: 'repo/hoodiehq/camp/issues'
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/get_issues', function (req, res) {
  res.send('bleh')
})

app.use(express.static('public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
