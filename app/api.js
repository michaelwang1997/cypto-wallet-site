module.exports = function(app) {


    var messageCount = 1;
    var messages = {
        0: "Test message",
        1: "Another test message"
    };


    app.post("/api/messages", function(req, res) {
        var body = req.body;
        console.log(body);
        res.contentType("application/json");
        res.status(200).send(JSON.stringify("Post request received"));
    })

    app.get("/api/messages", function(req, res) {
        res.status(200).send(messages);
    })

    app.delete("/api/messages/:id", function(req, res) {
        var id = req.param('id');

        if (messages[id]) {
            delete messages[id];
            res.status(200).send("Deleted message with id " + id);    
        } else {
            res.status(400).send("That message id does not exist")
        }
    })

}
