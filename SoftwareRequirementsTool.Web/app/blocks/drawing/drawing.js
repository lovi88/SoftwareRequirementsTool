//creating or keeping (if it were created in other file) the namespace 
var SoftwareRequirementsTool = SoftwareRequirementsTool || {};

SoftwareRequirementsTool.drawing = {
    Point: function (px, py) {
        this.x = px || 0;
        this.y = py || 0;
    },

    distanceOfPoints: function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },

    angleOfLineByPoints: function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    },

    drowLineFromJQueryElmToJQueryElm: function () {

    }
};

