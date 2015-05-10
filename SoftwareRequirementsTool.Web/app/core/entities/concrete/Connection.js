var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Connection = (function (_super) {
        __extends(Connection, _super);
        function Connection(From, To) {
            _super.call(this);
            this.From = From;
            this.To = To;
        }
        Connection.prototype.setUpFromObject = function (object) {
            this.Id = object.Id;
            this.From = Entities.EntityFactory.createFrom(object.From);
            this.To = Entities.EntityFactory.createFrom(object.To);
        };
        return Connection;
    })(Entities.BaseEntity);
    Entities.Connection = Connection;
})(Entities || (Entities = {}));
//# sourceMappingURL=Connection.js.map