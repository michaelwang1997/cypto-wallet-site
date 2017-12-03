
var messageCount = 1;
var messages = {
    0: "Test message"
};


app.post("/api/messages", function(req, res) {
    var body = req.body;
    console.log(body);
    res.contentType("application/json");
    res.status(200).send(JSON.stringify(messages));
})

app.get("/api/messages", function(req, res) {
    res.send(messages);
})

app.delete("/api/messages/:id", function(req, res) {
    var messageId = req.param.id;
    console.log("Message Id is " + messageId);
    /*messages[req.params.id] = null;
    console.log(messages);*/
})
