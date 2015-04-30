// Accessable instances of Core Services

module CoreServices {
    export var projectsServiceInstance = new ProjectsService();

    export var diagramsServiceInstance = new DiagramService();

    export var diagramPartServiceInstance = new DiagramPartService();

    export var userStoryServiceInstance = new UserStoryService();

    export var actorServiceInstance = new CustomService("actorHub", "actors");
}
