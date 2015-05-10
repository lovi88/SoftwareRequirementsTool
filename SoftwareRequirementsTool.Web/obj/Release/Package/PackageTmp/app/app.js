//init Core SignalR services
CoreServices.BaseSignalRService.startConnections(function () {
    console.log("services started");
    initAngular();
});

//init SignalR error tracking
$.connection.hub.error(function (error) {
    console.log("SignalR error: " + error);
});


function initAngular() {
    console.log("angular init called");
    
    angular.element(document).ready(function () {

        console.log("angular init DOM ready");
        angular.bootstrap(document, ["app"]);

        console.log("after bootstrap");
    });
}


var app = angular.module("app", [
    // Angular modules 
    "ui.router",
    "ui.bootstrap",
    "ngStorage",
    "ngAnimate",
    // Custom modules 

    // 3rd Party Modules
    "angularSpinner"
]);