var newestMessage = "";
var newId = -1;

var counter = 0;

function ajaxMessage() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/api/messages/latest',
		success: function(data) {
			var modal = document.getElementById("messageModal");
			var modalText = document.getElementById("messageSpan");
			var data = JSON.parse(data);
			if (data.id != newId) {
				newestMessage = data.message;
				newId = data.id
				modalText.innerHTML = newestMessage;
				counter = 0;
                $("#messageModal").fadeIn(1000);
			}
			else{
				counter++;
				if (counter == 10) {
                	$("#messageModal").fadeOut(1000);
                	counter = 0;
                }
			}
		},
		error: function(xhr, error) {
			console.log("Something went wrong: ", error);
		}
	})
};
	
setInterval(ajaxMessage, 1000);

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}