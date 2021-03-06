﻿//init Core SignalR services
CoreServices.BaseSignalRService.startConnections(function () {
    console.log("services started");
    initAngular();
});

//init SignalR error tracking
$.connection.hub.error(function (error) {
    console.log("SignalR error: " + error);
});

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

function initAngular() {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ["app"]);
    });
}