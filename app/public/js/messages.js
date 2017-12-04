//console.log(user);
var newestMessage = "";

function ajaxMessage() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/api/messages/latest',
		success: function(data) {
			var modal = document.getElementById("messageModal");
			var modalText = document.getElementById("messageSpan");
			console.log(data);
			if (data != newestMessage) {
				newestMessage = data;
				console.log("New latest message: " + newestMessage);
				modalText.innerHtml = newestMessage;
			} 

		},
		error: function(xhr, error) {
			console.log("Something went wrong: ", error);
		}
	})
};
	
setInterval(ajaxMessage, 1000);

