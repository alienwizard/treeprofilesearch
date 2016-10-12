var Profile = require("./profile.js");
var renderer = require("./renderer.js");




	
	function home(request, response){

	//if url == "/" && GET
	if(request.url === "/"){
		//show search
		response.writeHead(200, {'content-Type' :'text/plain'});
		renderer.view("header",{}, response);
		renderer.view('search', {}, response);
		response.end('footer', {}, response);
	}

	//if url == "/" && POST
		//redirect to /:username

}

function user(request, response){
	//if url == '/username'

	var username = request.url.replace("/", "");
	if (username.length > 0) {

		response.writeHead(200, {'content-Type' :'text/plain'});
		response.write('Header\n');

		//get JSON
		var studentProfile = new Profile(username);
		//on end
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store the values which we need
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.Javascript
			}

			//simple response
		renderer.view('profile', values, response);
		response.view('footer', {}, response);

		});

		//on error
		studentProfile.on("error", function(error){
			//show error
			response.end('Footer\n');
		});
	




			
				

		}
}

module.exports.home = home;
module.exports.user = user;