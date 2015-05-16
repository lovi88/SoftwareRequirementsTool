var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Diagram = (function (_super) {
        __extends(Diagram, _super);
        function Diagram() {
            _super.apply(this, arguments);
            this.DiagramElements = new Array();
        }
        //owerride
        Diagram.prototype.setUpFromObject = function (object) {
            _super.prototype.setUpFromObject.call(this, object);
            for (var oKey in object.DiagramElements) {
                if (object.hasOwnProperty(oKey)) {
                    this.DiagramElements[oKey] = new Entities.DiagramPart();
                    this.DiagramElements[oKey].setUpFromObject(object[oKey]);
                }
            }
        };
        Diagram.createFromObject = function (object) {
            var baseDiagram = new Diagram();
            baseDiagram.setUpFromObject(object);
            return baseDiagram;
        };
        return Diagram;
    })(Entities.BaseEntity);
    Entities.Diagram = Diagram;
})(Entities || (Entities = {}));
//# sourceMappingURL=Diagram.js.map