module CoreServices {

    export class CustomService extends BaseOpenCloseGetAllForService {
        initCallback: any;

        constructor(hubName, propertyName, initCallback?) {
            this[propertyName] = new Array();
            super(propertyName);
            this.initHub(hubName);

            this.initCallback = initCallback;

            BaseSignalRService.activeChildServices.push(this);
        }

        init() {
            if (Utils.TypeChecker.isFunction(this.initCallback)) {
                this.initCallback();
            }
        }

    }

    //projectHub
    export class ProjectsService extends BaseOpenCloseService {

        constructor() {
            super("projects");
            this.initProperty();
            this.initHub("projectHub");

            BaseSignalRService.activeChildServices.push(this);
        }

        projects = new Array<Entities.BaseEntity>();

        init() {
            this.loadAllToProperty();
        }

        private static instance = null;
        static getInstance() {
            if (this.instance == null) {
                this.instance = new ProjectsService();
            }

            return this.instance;
        }

    }

    //diagramHub
    export class DiagramService extends BaseOpenCloseGetAllForService {

        constructor() {
            super("diagrams");
            this.initProperty();
            this.initHub("diagramHub");

            BaseSignalRService.activeChildServices.push(this);
        }

        diagrams = new Array<Entities.BaseEntity>();

        init() { }

        private static instance = null;
        static getInstance() {
            if (this.instance == null) {
                this.instance = new DiagramService();
            }

            return this.instance;
        }

    }

    //userStoryHub
    export class UserStoryService extends BaseGetAllForService {

        constructor() {
            super("userStories");
            this.initProperty();
            this.initHub("userStoryHub");

            BaseSignalRService.activeChildServices.push(this);
        }

        userStories = new Array<Entities.BaseEntity>();

        init() { }
    }
}