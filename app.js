var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res
  	.status(404)
  	.send('Sorry, page not found!');
});

/*app.use((err, req, res, next) => {
  console.error(err.stack);
  res
  	.status(500)
  	.send('Something broken!');
});*/

app.listen(7000, () => {
  console.log('Server is listening on port 7000');
});

app.get('/', (req, res) => {	
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/getData', (req, res) => {
	res.json({hello: "world"});
});