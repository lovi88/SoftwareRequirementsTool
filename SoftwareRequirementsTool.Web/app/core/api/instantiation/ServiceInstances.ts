// Accessable instances of Core Services

module CoreServices {
    export var projectsServiceInstance = ProjectsService.getInstance();

    export var diagramsServiceInstance = DiagramService.getInstance();

    export var userStoryServiceInstance = new UserStoryService();

    export var actorServiceInstance = new CustomService("actorHub", "actors");

    //Diagram Part View Instances

    export var actorDiagramPartServiceInseance =
        new CustomService("actorDiagramPartHub", "diagramParts");

    export var useCaseDiagramPartServiceInseance =
        new CustomService("useCaseDiagramPartHub", "diagramParts");

    export var connectionDiagramPartServiceInseance =
        new CustomService("connectionDiagramPartHub", "diagramParts");

}
