module CoreServices {

    export class ProjectsService extends BaseSignalRService {

        constructor() {
            super("projects");
            this.initProperty();
            this.initHub("projectHub");

            BaseSignalRService.activeChildServices.push(this);
        }

        projects = new Array<IProject>();

        getAll(callback: IArrayWaitCallback) {
            super.getAll(result => {
                
                var allProject = new Array<Project>();

                for (var prObjKey in result) {
                    if (result.hasOwnProperty(prObjKey)) {
                        allProject[prObjKey] = Project.createFromObject(result[prObjKey]);
                    }
                }
                
                callback(allProject);
            });

        }

        init() {
            
            this.getAll(result => {

                for (var rKey in result) {
                    if (result.hasOwnProperty(rKey)) {
                        this.projects[rKey] = result[rKey];
                    }
                }

                this.changeOccured(result);
            });
        }

    }

    //TODO: delete test codes
    export var projectsServiceInstance = new ProjectsService();
}