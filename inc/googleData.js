var google = require('google')
 
google.resultsPerPage = 1;
 
google('download mp3', function (err, res){
  if (err) console.error(err);
  
  var link = res.links[0];
  console.log(link.title + ' - ' + link.href);  
 
});  