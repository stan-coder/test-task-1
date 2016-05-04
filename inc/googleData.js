module.exports = (cb) => {

	var google = require('google');	 
	google.resultsPerPage = 1;
	 
	google('download mp3', (err, res) => {
	  
	  if (err) {
	  	cb({
	  		success: false, 
	  		error: err
	  	});
	  }
	  
	  var link = res.links[0];

	  cb({
	  	success: true,
	  	title: link.title, 
	  	href: link.href
	  });
	});
};