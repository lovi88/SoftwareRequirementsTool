var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var BaseEntity = (function () {
        function BaseEntity() {
        }
        BaseEntity.prototype.setUpFromObject = function (object) {
            //EntityFactory.createComplexFrom(object);
            Utils.InitFromObj.initObj(this, object);
        };
        BaseEntity.prototype.isValid = function () {
            return true;
        };
        BaseEntity.prototype.save = function () {
        };
        return BaseEntity;
    })();
    Entities.BaseEntity = BaseEntity;
    var BaseElement = (function (_super) {
        __extends(BaseElement, _super);
        function BaseElement() {
            _super.apply(this, arguments);
        }
        BaseElement.prototype.save = function () {
        };
        BaseElement.prototype.isValid = function () {
            if (Utils.TypeChecker.isUndefinedOrNull(this.Name)) {
                return false;
            }
            if (this.Name === "") {
                return false;
            }
            if (Utils.TypeChecker.isUndefinedOrNull(this.ContainerProject)) {
                return false;
            }
            return _super.prototype.isValid.call(this);
        };
        return BaseElement;
    })(BaseEntity);
    Entities.BaseElement = BaseElement;
    var DiagramPart = (function (_super) {
        __extends(DiagramPart, _super);
        function DiagramPart() {
            _super.apply(this, arguments);
        }
        DiagramPart.addClickedCallback = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.clickedCallbacks, callback);
        };
        DiagramPart.clicked = function (from) {
            this.clickedCallbacks.forEach(function (callback) {
                callback(from, "clicked");
            });
        };
        DiagramPart.prototype.setUpFromObject = function (object) {
            _super.prototype.setUpFromObject.call(this, object);
            this.Element = Entities.EntityFactory.createFrom(object.Element);
            this.Diagram = Entities.EntityFactory.createFrom(object.Diagram);
        };
        DiagramPart.clickedCallbacks = new Array();
        return DiagramPart;
    })(BaseElement);
    Entities.DiagramPart = DiagramPart;
})(Entities || (Entities = {}));
//# sourceMappingURL=BaseEntities.js.map