module Modelling {

    export class BaseElementData extends AbsInitFromObj implements IElementData, ISavable {
        id: number;
        name: string;
        description: string;

        constructor(elementData?: IElementData) {
            super();

            super.initFromObj(elementData);
        }

        save() { throw new Error("Not implemented"); }

        rollback() { throw new Error("Not implemented"); }
    }


    declare var d3: any;
    export class BaseElementView
        extends AbsInitFromObj
        implements IElementView, ISavable, IDraggable {

        id: number;
        coordinates: IPoint;
        width: number;
        height: number;
        center: IPoint;
        textPosition: IPoint;

        private dragStartListeners: Array<IOccurationListener> = new Array<IOccurationListener>();
        private dragingListeners: Array<IOccurationListener> = new Array<IOccurationListener>();
        private dragEndListeners: Array<IOccurationListener> = new Array<IOccurationListener>();

        private dragStartCallbacks: Array<IEventCallback> = new Array<IEventCallback>();
        private draggingCallbacks: Array<IEventCallback> = new Array<IEventCallback>();
        private dragEndCallbacks: Array<IEventCallback> = new Array<IEventCallback>();

        constructor(elementView?: IElementView) {
            super();

            if (elementView) {
                super.initFromObj(elementView);

            } else {
                this.coordinates = new Point();
                this.center = new Point();
                this.textPosition = new Point();

                this.coordinates.x = 10;
                this.coordinates.y = 10;
                this.width = 302;
                this.height = 102;

                this.recalculateCenter();
                this.recalculateTextPosition(10);
            }


        }

        recalculateTextPosition(txtLen?: number): void {
            this.textPosition.x = (this.width / 2) -30;
            if (txtLen) {
                this.textPosition.x -= txtLen;
            }

            this.textPosition.y = (this.height / 2) + 2;
        }

        recalculateCenter(): void {
            this.center.x = this.coordinates.x + (this.width / 2);
            this.center.y = this.coordinates.y + (this.height / 2);
        }

        applyDraggable(domElement: any): void {

            var that = this;
            var drag: any = d3.behavior.drag()
                .on("dragstart", function (d) {
                //do some drag start stuff...
                //this : actual domElement
                that.dragStart();
            })
                .on("drag", function (d) {
                //hey we're dragging, let's update some stuff

                that.dragging(this);

            })
                .on("dragend", function () {
                //we're done, end some stuff
                that.dragEnd();
            });

            d3.selectAll(domElement.toArray()).call(drag);
        }

        dragStart(): void {
            this.dragStartListeners.forEach(listener => {
                listener.occured(this, null);
            });

            this.dragStartCallbacks.forEach(callback => {
                callback(this, null);
            });

        }

        private dragCnt: number = 0;
        dragging(domElement: any): void {

            this.d3Dragging(domElement);
            if (this.dragCnt % 5 === 0) {
                this.save();
            }


            this.dragingListeners.forEach(listener => {
                listener.occured(this, null);
            });

            this.draggingCallbacks.forEach(callback => {
                callback(this, null);
            });

        }

        private d3Dragging(domElement: any): void {
            var sel = d3.select(domElement);
            var x = sel.attr('x');
            var y = sel.attr('y');

            var xNext = parseInt(x) + d3.event.dx;
            var yNext = parseInt(y) + d3.event.dy;

            sel.attr("x", xNext);
            sel.attr("y", yNext);

            this.coordinates.x = xNext;
            this.coordinates.y = yNext;
        }

        dragEnd(): void {
            this.dragEndListeners.forEach(listener => {
                listener.occured(this, null);
            });

            this.dragEndCallbacks.forEach(callback => {
                callback(this, null);
            });

            this.save();
        }

        save(): void { }

        rollback(): void { }

        addDragStartEventListener(listener: IOccurationListener) {
            this.dragStartListeners.push(listener);
        }

        addDraggingEventListener(listener: IOccurationListener) {
            this.dragingListeners.push(listener);
        }

        addDragEndtEventListener(listener: IOccurationListener) {
            this.dragEndListeners.push(listener);
        }

        addDragStartEventCallback(callback: IEventCallback) {
            this.dragStartCallbacks.push(callback);
        }

        addDraggingEventCallback(callback: IEventCallback) {
            this.draggingCallbacks.push(callback);
        }

        addDragEndtEventCallback(callback: IEventCallback) {
            this.dragEndCallbacks.push(callback);
        }
    }


    export class BaseElement implements IElement, ISavable {

        data: IElementData;
        view: IElementView;


        constructor(element: IElement) {
            if (element) {
                this.data = new BaseElementData(element.data);
                this.view = new BaseElementView(element.view);
            } else {
                this.init();
            }
        }

        //in next version of TS- it should be protected
        init() {
            this.data = new BaseElementData();
            this.view = new BaseElementView();
        }

        save(): void {
            (<BaseElementData> this.data).save();
            (<BaseElementView> this.view).save();
        }

        rollback(): void {
            (<BaseElementData> this.data).rollback();
            (<BaseElementView> this.view).rollback();
        }
    }


 


}