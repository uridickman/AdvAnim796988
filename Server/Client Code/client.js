class Client {
    constructor(message) {
        this.ws;

        this.data = {
            type: "message",
            msg: message,
        };

        let url = "ws://localhost:8080/ws";

        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(this.data));
            context.font = '25px times';
            context.fillText("Client: " + this.data["msg"], canvas.width / 2 - 150, canvas.height / 2 - 100);
        }

        this.ws.onmessage = (event) => {
            let mes = JSON.parse(event.data)["msg"];
            console.log("Message -- " + mes + " -- received.");

            setTimeout(function () {
                context.font = '25px times';
                context.fillText("Server: " + mes, canvas.width / 2 - 150, canvas.height / 2);
            }, 1000);
        }
    }
}