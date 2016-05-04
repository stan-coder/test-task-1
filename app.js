var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(7000, () => {
  console.log('Server is listening on port 7000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


/*var google = require('google')
 
google.resultsPerPage = 1;
 
google('download mp3', function (err, res){
  if (err) console.error(err);
  
  var link = res.links[0];
  console.log(link.title + ' - ' + link.href);  
 
});*/  