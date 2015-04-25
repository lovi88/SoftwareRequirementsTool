module Entities {
    export class DiagramPart extends BaseEntity implements IDiagramPart {

        Element: IElement;
        View: IView;
        Diagram: IDiagram;

        setUpFromObject(object: IDiagramPart) {
            this.Element = <IElement>EntityFactory.createFrom(object.Element);
            this.View = EntityFactory.createViewFrom(object.View);
            this.Diagram = <IDiagram>EntityFactory.createFrom(object.Diagram);
        }

    }
} 