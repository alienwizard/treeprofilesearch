
var fs = require('fs');

function view(templateName, values, response) {

		//read from template files
		var fileContents = fs.readFileSync('./views/' + templateName + '.html');

		response.write(fileContents);
		
		//Insert values in to the content

		//write out the response	
		
}

module.exports.view = view;


