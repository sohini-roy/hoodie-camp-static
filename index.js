var express = require('express')
var bodyParser = require('body-parser')
var https = require('https')

var app = express();

var options = {
  host: 'api.github.com',
  path: '/repos/hoodiehq/camp/issues',
  method: 'GET',
  headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/get_issues', function (req, res) {
  var request = https.request(options, function(response){
    var body = '';
    response.on('data',function(chunk){
        body+=chunk;
    });

    response.on('end',function(){
        var issues_data = JSON.parse(body);
        var response_data = {
          camp_issues: issues_data.length,
          first_pr: 0,
          first_timer: 0
        }
        for(var i=0;i<issues_data.length;i++){
          for(var j=0;j<issues_data[i].labels.length;j++){
            if(issues_data[i].labels[j].name=="Your First PR"){
              response_data.first_pr+=1
            }
            if(issues_data[i].labels[j].name=="first-timers-only"){
              response_data.first_timer+=1
            }
          }
        }
        res.send(response_data)
    });
  });

  request.on('error', function(e) {
    console.error('Error: '+e);
  });
  request.end();

})

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
