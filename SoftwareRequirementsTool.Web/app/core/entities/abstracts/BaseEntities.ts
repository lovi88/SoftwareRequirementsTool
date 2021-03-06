﻿module Entities {
    export class BaseEntity implements IEntity {
        Id: number;
        TypeName: string;

        setUpFromObject(object) {

            //EntityFactory.createComplexFrom(object);
            Utils.InitFromObj.initObj(this, object);
        }

        isValid(): boolean {
            return true;
        }

        save(): void {

        }

    }

    export class BaseElement extends BaseEntity implements IElement {

        Author: string;
        Description: string;
        Name: string;
        Id: number;
        TypeName: string;
        ContainerProject: Project;


        save(): void { }

        refresh(): void { }

        isValid() {
            if (Utils.TypeChecker.isUndefinedOrNull(this.Name)) {
                return false;
            }

            if (this.Name === "") {
                return false;
            }

            if (Utils.TypeChecker.isUndefinedOrNull(this.ContainerProject)) {
                return false;
            }

            return super.isValid();
        }
    }

    export class DiagramPart extends BaseElement implements IDiagramPart {

        private static clickedCallbacks = new Array<IEventCallback>();

        static addClickedCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.clickedCallbacks, callback);
        }

        protected static clicked(from: DiagramPart) {
            this.clickedCallbacks.forEach(callback => {
                callback(from, "clicked");
            });

        }

        Element: IElement;
        Diagram: IDiagram;

        setUpFromObject(object: IDiagramPart) {

            super.setUpFromObject(object);

            this.Element = <IElement>EntityFactory.createFrom(object.Element);
            this.Diagram = <IDiagram>EntityFactory.createFrom(object.Diagram);

        }

    }
}