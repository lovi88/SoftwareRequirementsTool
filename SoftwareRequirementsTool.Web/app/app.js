CoreServices.BaseSignalRService.startConnections(function () {
    console.log("services started");
    initAngular();
});

function initAngular() {
    angular.bootstrap(document, ["app"]);
}


var app = angular.module("app", [
    // Angular modules 
    "ui.router",
    "ui.bootstrap",
    "ngAnimate",
    // Custom modules 

    // 3rd Party Modules
    "ngStorage"
]);