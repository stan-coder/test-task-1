module.exports = (cb) => {

	//var google = require('google');	 
	//google.resultsPerPage = 1;
	
	setTimeout(() => {
		cb({
	  	success: true,
	  	title: 'Title 1', 
	  	href: 'Link 1'
	  });
	}, 700);

	/*google('nodejs in action', (err, res) => {
	  
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
	});*/
};