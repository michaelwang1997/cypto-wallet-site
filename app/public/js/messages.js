//console.log(user);
var newestMessage = "";

function ajaxMessage() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/api/messages/latest',
		success: function(data) {
			console.log(data);
			if (data != newestMessage) {
				newestMessage = data;
				console.log("New latest message: " + newestMessage);
			}
		},
		error: function(xhr, error) {
			console.log("Something went wrong: ", error);
		}
	})
};
	
setInterval(ajaxMessage, 5000);

