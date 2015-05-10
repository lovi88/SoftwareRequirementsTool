// Accessable instances of Core Services
var CoreServices;
(function (CoreServices) {
    CoreServices.projectsServiceInstance = CoreServices.ProjectsService.getInstance();
    CoreServices.diagramsServiceInstance = CoreServices.DiagramService.getInstance();
    CoreServices.userStoryServiceInstance = new CoreServices.UserStoryService();
    CoreServices.actorServiceInstance = new CoreServices.CustomService("actorHub", "actors");
    CoreServices.useCaseServiceInstance = new CoreServices.CustomService("useCaseHub", "usecases");
    //Diagram Part View Instances
    CoreServices.actorDiagramPartServiceInseance = new CoreServices.CustomService("actorDiagramPartHub", "diagramParts");
    CoreServices.useCaseDiagramPartServiceInseance = new CoreServices.CustomService("useCaseDiagramPartHub", "diagramParts");
    CoreServices.connectionDiagramPartServiceInseance = new CoreServices.CustomService("connectionDiagramPartHub", "diagramParts");
})(CoreServices || (CoreServices = {}));
var Entities;
(function (Entities) {
    Entities.UseCaseView.service = CoreServices.useCaseDiagramPartServiceInseance;
    Entities.ActorView.service = CoreServices.actorDiagramPartServiceInseance;
})(Entities || (Entities = {}));
//# sourceMappingURL=ServiceInstances.js.map