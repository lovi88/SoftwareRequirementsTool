var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Project = (function (_super) {
        __extends(Project, _super);
        function Project() {
            _super.apply(this, arguments);
            this.TypeName = "Project";
        }
        return Project;
    })(Entities.BaseEntity);
    Entities.Project = Project;
})(Entities || (Entities = {}));
//# sourceMappingURL=Project.js.map