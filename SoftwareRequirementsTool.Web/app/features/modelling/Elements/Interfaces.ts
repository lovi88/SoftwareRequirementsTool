
interface IEventCallback {
    (from: any, data: any): any;
}

interface IOccurationListener {
    occured(from: any, data: any): void;
}

interface IPoint {
    x: number;
    y: number;
}

interface ISavable {
    save(): void;
    rollback(): void;
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


interface IElementView {
    id: number;
    coordinates: IPoint;
    width: number;
    height: number;
    center: IPoint;
    textPosition: IPoint;

    recalculateCenter(): void;

}

interface IUseCaseView extends IElementView {
    cx: number;    //the center of the ellipse
    cy: number;
    rx: number;    //radius
    ry: number;
}

interface IElementData {
    id: number;
    name: string;
    description: string;
}

interface IElement {
    data: IElementData;
    view: IElementView;
}

interface IConnection {
    from: IElement;
    to: IElement;
}
