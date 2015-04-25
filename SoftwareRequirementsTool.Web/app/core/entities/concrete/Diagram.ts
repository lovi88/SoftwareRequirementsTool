module Entities {
    export class Diagram extends BaseEntity implements IDiagram {

        Author: string;
        Description: string;
        Name: string;

        DiagramElements = new Array<IDiagramPart>();
        AbstractionLevel: number;
        ContainerProject: Project;

        //owerride
        setUpFromObject(object: IDiagram) {
            super.setUpFromObject(object);

            for (var oKey in object.DiagramElements) {
                if (object.hasOwnProperty(oKey)) {
                    this.DiagramElements[oKey] = new DiagramPart();
                    this.DiagramElements[oKey].setUpFromObject(object[oKey]);
                }
            }
        }

        static createFromObject(object) {
            var baseDiagram = new Diagram();
            baseDiagram.setUpFromObject(object);

            return baseDiagram;
        }
    }
} 