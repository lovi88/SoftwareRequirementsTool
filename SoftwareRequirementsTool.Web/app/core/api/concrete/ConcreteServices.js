var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CoreServices;
(function (CoreServices) {
    var CustomService = (function (_super) {
        __extends(CustomService, _super);
        function CustomService(hubName, propertyName, initCallback) {
            this[propertyName] = new Array();
            _super.call(this, propertyName);
            this.initHub(hubName);
            this.initCallback = initCallback;
        }
        CustomService.prototype.init = function () {
            if (Utils.TypeChecker.isFunction(this.initCallback)) {
                this.initCallback();
            }
        };
        return CustomService;
    })(CoreServices.BaseOpenCloseGetAllForService);
    CoreServices.CustomService = CustomService;
    //projectHub
    var ProjectsService = (function (_super) {
        __extends(ProjectsService, _super);
        function ProjectsService() {
            _super.call(this, "projects");
            this.projects = new Array();
            this.initProperty();
            this.initHub("projectHub");
        }
        ProjectsService.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ProjectsService();
            }
            return this.instance;
        };
        ProjectsService.instance = null;
        return ProjectsService;
    })(CoreServices.BaseOpenCloseService);
    CoreServices.ProjectsService = ProjectsService;
    //diagramHub
    var DiagramService = (function (_super) {
        __extends(DiagramService, _super);
        function DiagramService() {
            _super.call(this, "diagrams");
            this.diagrams = new Array();
            this.initProperty();
            this.initHub("diagramHub");
        }
        DiagramService.getInstance = function () {
            if (this.instance == null) {
                this.instance = new DiagramService();
            }
            return this.instance;
        };
        DiagramService.instance = null;
        return DiagramService;
    })(CoreServices.BaseOpenCloseGetAllForService);
    CoreServices.DiagramService = DiagramService;
    //userStoryHub
    var UserStoryService = (function (_super) {
        __extends(UserStoryService, _super);
        function UserStoryService() {
            _super.call(this, "userStories");
            this.userStories = new Array();
            this.initProperty();
            this.initHub("userStoryHub");
        }
        return UserStoryService;
    })(CoreServices.BaseGetAllForService);
    CoreServices.UserStoryService = UserStoryService;
})(CoreServices || (CoreServices = {}));
//# sourceMappingURL=ConcreteServices.js.map