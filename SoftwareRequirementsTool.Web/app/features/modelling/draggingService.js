(function () {
    "use strict";

    function draggingFactory() {
        return {
            applyDraggable: function (element, view) {
                view.applyDraggable(element);
            },

            addDraggingEventListener: function (view, listener) {
                view.addDraggingEventListener(listener);
            },

            addDragStartEventListener: function (view, listener) {
                view.addDragStartEventListener(listener);
            },

            addDragEndEventListener: function (view, listener) {
                view.addDragEndEventListener(listener);
            }
        }
    }

    angular
        .module("app")
        .factory("draggingService", draggingFactory);
})();