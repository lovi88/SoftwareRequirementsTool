interface IProject {
    id: number;
    name: string;
    description: string;
}

class Project implements IProject {
    id: number;
    name: string;
    description: string;
}

class BaseSignalRService implements ICrudObservableSubject {

    protected hub: any;
    protected observers = new Array<ICrudObserver>();
    protected propertyName;

    constructor(propertyName) {
        this.propertyName = propertyName;
    }

    protected propertyAssert(propName: string): void {
        if (!this.hasOwnProperty(propName)) {
            throw "Invalid Property";
        }
    }

    protected initHub(hubName: string): any {
        this.hub = $.connection[hubName];
    }


    static startConnections(callback: any) {

        if (callback instanceof Function) {
            $.connection.hub.start(callback);
        } else {
            $.connection.hub.start();
        }
    }


    protected created(element: any): void {
        this.propertyAssert(this.propertyName);

        this[this.propertyName].push(element);

        this.observers.forEach(item => {
            item.created(element);
        });
    }


    protected modified(element: any): void {
        this.propertyAssert(this.propertyName);

        var list = this[this.propertyName];
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === element.id) {
                //TODO modify
                console.log(list[i]);
                console.log(element);

                break;
            }
        }

        this.observers.forEach(item => {
            item.modified(element);
        });
    }

    protected deleted(element: any): void {
        this.propertyAssert(this.propertyName);

        var list = this[this.propertyName];
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === element.id) {
                list.splice(i, 1);

                break;
            }
        }

        this.observers.forEach(item => {
            item.deleted(element);
        });
    }

    registerObserver(observer: ICrudObserver) {
        this.observers.push(observer);
    }

    unregisterObserver(observer: ICrudObserver) {
        var idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers.splice(idx, 1);
        }
    }
}


class ProjectsService extends BaseSignalRService {

    constructor() {
        super("projects");
        this.initHub("projectHub");

        this.hub.client.created = (projet) => this.created(projet);
        this.hub.client.modified = (projet) => this.modified(projet);
        this.hub.client.deleted = (projet) => this.deleted(projet);
    }

    projects = new Array<IProject>();

    create(project) {
        this.hub.server.create(project);
    }
}


//TODO: delete test codes
var testService = new ProjectsService();

BaseSignalRService.startConnections(() => {
    var prj = new Project();
    prj.name = "pisti";
    prj.description = "almafa";
    testService.create(prj);
});



class Bla implements ICrudObservableSubject {
    //protected ctx: ISwReqToolContext;

    //constructor(context: ISwReqToolContext) {
    //    this.ctx = context;
    //}

    openProject(project: Project) {


    }

    getElement(element) {

    }

    getAllElemens(): Project[] {

        return new Array<Project>();
    }

    createElement(element) {

    }

    modifyElement(element) {

    }

    registerObserver(observer: ICrudObserver) {

    }

    unregisterObserver(observer: ICrudObserver) {

    }
}