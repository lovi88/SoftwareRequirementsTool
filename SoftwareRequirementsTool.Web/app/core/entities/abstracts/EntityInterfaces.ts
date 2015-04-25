interface ISavable {
    save(): void;
    rollback(): void;
}

interface IEntity extends ISavable {
    Id: number;
    TypeName: string;
    setService(service: IServerService);
    setUpFromObject(object: any);
}


interface IElement extends IEntity {
    Author: string;
    Description: string;
    Name: string;
}

interface IConnection extends IEntity {
    From: IEntity;
    To: IEntity;
    Scope: IEntity;
    Stereotype: IStereotype;
    ConnectionType: string;
}

interface IPoint {
    X: number;
    Y: number;
}

interface IStereotype extends IEntity {
    Name: string;
}

interface IView extends IEntity {
    Coordinates: IPoint;
    Width: number;
    Height: number;
    Stereotype: IStereotype;

    Center: IPoint;
    TextPosition: IPoint;

    recalculateCenter(): void;
}

interface IUseCaseView extends IView {
    cx: number;    //the center of the ellipse
    cy: number;
    rx: number;    //radius
    ry: number;
}


interface IDiagramPart extends IEntity {
    Element: IElement;
    Diagram: IDiagram;
    View: IView;
}


interface IDiagram extends IElement {
    DiagramElements: Array<IDiagramPart>;
    AbstractionLevel: number;
}


interface IDraggable {
    applyDraggable(domElement: any): void;

    addDragStartEventListener(listener: IOccurationListener);
    addDraggingEventListener(listener: IOccurationListener);
    addDragEndtEventListener(listener: IOccurationListener);

    addDragStartEventCallback(callback: IEventCallback);
    addDraggingEventCallback(callback: IEventCallback);
    addDragEndtEventCallback(callback: IEventCallback);
}