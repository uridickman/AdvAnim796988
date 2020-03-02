function MMOC() {
    this.ws;
    this.id = "";
    this.connected = false;

    this.init();
}

MMOC.prototype.init = function () {


    this.ws = new WebSocket();

    this.ws.onopen = function(event){
        console.log("websocket is open now");
    }
}

MMOC.prototype.sendGreeting = function () {

}