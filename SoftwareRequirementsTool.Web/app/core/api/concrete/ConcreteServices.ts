module CoreServices {
    export class CustomService extends BaseOpenCloseGetAllForService {
        initCallback: any;

        constructor(hubName, propertyName, initCallback?) {
            this[propertyName] = new Array();
            super(propertyName);
            this.initHub(hubName);

            this.initCallback = initCallback;
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
        }

        projects = new Array<Entities.BaseEntity>();

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
        }

        diagrams = new Array<Entities.BaseEntity>();

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
        }

        userStories = new Array<Entities.BaseEntity>();
    }
}