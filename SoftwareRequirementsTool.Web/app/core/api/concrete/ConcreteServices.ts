﻿module CoreServices {
    //TODO: Project entitás?
    //TODO: View Revise

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
    }

    //diagramPartHub
    export class DiagramPartService extends BaseSignalRService {

        constructor() {
            super("diagramParts");
            this.initProperty();
            this.initHub("diagramPartHub");

            BaseSignalRService.activeChildServices.push(this);
        }

        diagramParts = new Array<Entities.BaseEntity>();

        init() { }
    }

    //userStoryHub
    export class UserStoryService extends BaseGetAllForService{

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