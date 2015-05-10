var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point() {
            this.X = 0;
            this.Y = 0;
            _super.call(this);
        }
        return Point;
    })(Entities.BaseEntity);
    Entities.Point = Point;
})(Entities || (Entities = {}));
//# sourceMappingURL=Point.js.map