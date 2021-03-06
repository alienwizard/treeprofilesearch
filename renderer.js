
var fs = require('fs');


function mergeValues(values, content){

	//cycle over keys
			//replace all {{keys}} with the value from the values object

				for (var key in values) {


					content = content.replace("{{" + key + "}}", values[key]);
					
				}

		//return merged content
		return content;


}

function view(templateName, values, response) {

		//read from template files
		var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});

		
		
		//Insert values in to the content
		fileContents = mergeValues(values, fileContents);

		//write out the response

		response.write(fileContents);	
		
}

module.exports.view = view;


