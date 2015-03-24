module Modelling {
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
        applyDraggable(element: any): void;

        addDragStartEventListener(listener: IOccurationListener);
        addDraggingEventListener(listener: IOccurationListener);
        addDragEndtEventListener(listener: IOccurationListener);
    }

    interface IElement {
        coordinates: IPoint;
        width: number;
        height: number;
        center: IPoint;

        recalculateCenter(): void;

    }


    declare var d3: any;
    class AbsElement implements IElement, IDraggable, ISavable {
        coordinates: IPoint;
        width: number;
        height: number;
        center: IPoint;

        private dradStartListeners: IOccurationListener[];
        private dradingListeners: IOccurationListener[];
        private dradEndListeners: IOccurationListener[];


        recalculateCenter(): void {
            this.center.x = this.coordinates.x + (this.width / 2);
            this.center.y = this.coordinates.y + (this.width / 2);
        }


        applyDraggable(element): void {

            var that = this;
            var drag: any = d3.behavior.drag()
                .on("dragstart", function (d) {
                    //do some drag start stuff...
                    //this : actual element

                    that.dragStart();

                    that.dradStartListeners.forEach(listener => {
                        listener.occured(that, null);
                    });

                })
                .on("drag", function (d) {
                    //hey we're dragging, let's update some stuff

                    that.dragging(this);

                    that.dradingListeners.forEach(listener => {
                        listener.occured(that, null);
                    });

                })
                .on("dragend", function () {
                    //we're done, end some stuff
                    //save(scope);
                });

            d3.selectAll(element.toArray()).call(drag);
        }

        dragStart(): void {

        }

        dragging(element: any): void {

            var sel = d3.select(element);
            var x = sel.attr('x');
            var y = sel.attr('y');

            var xNext = parseInt(x) + d3.event.dx;
            var yNext = parseInt(y) + d3.event.dy;

            sel.attr("x", xNext);
            sel.attr("y", yNext);

            this.coordinates.x = xNext;
            this.coordinates.y = yNext;
        }

        dragEnd(): void { }

        save(): void { }

        rollback(): void { }

        addDragStartEventListener(listener: IOccurationListener) {
            this.dradStartListeners.push(listener);
        }

        addDraggingEventListener(listener: IOccurationListener) {
            this.dradingListeners.push(listener);
        }

        addDragEndtEventListener(listener: IOccurationListener) {
            this.dradEndListeners.push(listener);
        }
    }


}