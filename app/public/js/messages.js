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
				modalText.innerHTML = newestMessage;
                $("#messageModal").fadeIn(1000);
			}
			else{
                $("#messageModal").fadeOut(1000);
		}
		},
		error: function(xhr, error) {
			console.log("Something went wrong: ", error);
		}
	})
};
	
setInterval(ajaxMessage, 3000);

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}