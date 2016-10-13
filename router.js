var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");



var commonHeader = {'content-Type' :'text/html'};

	
	function home(request, response){

	//if url == "/" && GET
	if(request.url === "/"){

		if (request.method.toLowerCase() === "get") {


		//show search
		response.writeHead(200, commonHeader);
		renderer.view("header",{}, response);
		renderer.view('search', {}, response);
		renderer.view('footer', {}, response);
		response.end();

		}else{

				//if url == "/" && POST

					//get the psot data from body
					request.on("data", function(postBody){

						var body = postBody.toString();

						var query =  querystring.parse(body);


						response.writeHead(303, {"Location": "/" + query.username});
						response.end();




					})

					//exctract the username



		//redirect to /:username


			}
	}



}

function user(request, response){
	//if url == '/username'

	var username = request.url.replace("/", "");
	if (username.length > 0) {

		response.writeHead(200, commonHeader);
		renderer.view("header",{}, response);

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
		response.end();

		});

		//on error
		studentProfile.on("error", function(error){
			console.log(error)
			//show error
			renderer.view('error', {}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		});
	




			
				

		}
}

module.exports.home = home;
module.exports.user = user;