

function createCookie(name, value) {
    let expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "");
}

function fullscreen(_fullscreenElement) {

    var d = <any>document;

    if (!d.fullscreenElement && !d.mozFullScreenElement && !d.webkitFullscreenElement) {
        if (_fullscreenElement.requestFullscreen) {
            _fullscreenElement.requestFullscreen();
        } else if (_fullscreenElement.mozRequestFullScreen) {
            _fullscreenElement.mozRequestFullScreen();
        } else if (_fullscreenElement.webkitRequestFullscreen) {
            _fullscreenElement.webkitRequestFullscreen(); //Element.ALLOW_KEYBOARD_INPUT
        }
    }
};

function getSID(): string {
    let key = "Estella.example.SID";
    let sid = readCookie(key);
    if (!sid) {
        sid = (Math.floor(Math.random() * (1000000))).toString();
        createCookie(key, sid);
    }
    return sid;
}

function ready() {
    var sid = getSID();

    var loc = window.location;

    var socket = new WebSocket('ws://' + window.location.hostname + ':62787');
    var playerAction = new Estella.Example.AirHockey.ClientAction();
    var client = new Estella.Example.AirHockey.WebSocketGameClient(socket, sid, playerAction);
    client.setOnConnected(onClientConnected);


    var content = document.getElementById("content");

    /*var meter1 = (new FPSMeter(document.getElementById("fps1"), { position: "relative" }));
    var meter2 = (new FPSMeter(document.getElementById("fps2"), { position: "relative" }));*/


    var world = client.getEngine().getWorld();
    var engine = client.getEngine();


    let view: Estella.Example.AirHockey.View;


    function onClientConnected(client: Estella.Core.IWebSocketGameClient) {

        view = new Estella.Example.AirHockey.View(<HTMLDivElement>content, world, client.getClientId());
        view.start();
        view.mouseClick().on(onStageMouseClick);
        view.touchMove().on(onStageTouchMove);
        view.touchEnd().on(onStageTouchEnd);

        setInterval(updateScore, 100);
    }

    function onStageMouseClick(p: Estella.Example.AirHockey.IVector) {

        playerAction.moveTo(getPlayerObject().getId(), p);

        view.getRenderer().view.scrollIntoView(true);
        //fullscreen(view.getRenderer().view);
    }

    function onStageTouchEnd(p: Estella.Example.AirHockey.IVector) {
        playerAction.setClientForceVector(getPlayerObject().getId(), new Estella.Example.AirHockey.Vector(0, 0));
    }

    function onStageTouchMove(p: Estella.Example.AirHockey.IVector) {

        playerAction.moveTo(getPlayerObject().getId(), p);

    }

    let scoreDiv = document.getElementById("score");

    function updateScore() {
        var clientList = world.getClientListService().getIterator();
        let str = '';
        for (let client of clientList) {
            if (client instanceof Estella.Example.AirHockey.ClientActive) {
                let name = "";
                if (client.getName()) {
                    name = client.getName();
                }
                str += name + " (" + client.getId() + ") " + client.getScore() + "|";
            }
        }
        /*
        var itemList = world.getServiceList().getItemListService().getIterator();

        for (let item of itemList) {
            str += item.getId() + " (" + item.getBody().position.x + "; " + item.getBody().position.y + ") " + item.getBody().speed + "<br>";
            

        }*/

        var itemList = world.getItemListService().getIterator();
        for (let item of itemList) {
            if (item instanceof Estella.Example.AirHockey.ItemMallet) {
                let v = item.getPosition();
                str += JSON.stringify(v);
            }

        }

        scoreDiv.innerText = str;
    }

    var world = client.getEngine().getWorld();
    var objectListService = world.getItemListService();


    function getPlayerObject() {
        var o = objectListService.getFirst(o => (<Estella.Example.AirHockey.ItemMallet>(<any>o)).getClientId() == client.getClientId());
        return o;
    }



    let nameInput = <HTMLInputElement>(document.getElementById("name-input"));
    nameInput.onchange = (event) => {
        playerAction.changeClientName(client.getClientId(), nameInput.value);

    };

};


document.addEventListener("DOMContentLoaded", ready);
