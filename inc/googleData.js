module.exports = (query, cb) => {
	
	var google = require('google');	 
	google.resultsPerPage = 1;	

	google(query, (err, res) => {

	  if (err) {
	  	return cb({
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