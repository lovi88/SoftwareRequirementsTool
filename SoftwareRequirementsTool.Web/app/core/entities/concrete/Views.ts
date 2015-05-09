module Entities {
    //TODO: View Revise

    declare var d3: any;
    export class BaseView
        extends DiagramPart
        implements IView, IDraggable {

        Id: number;
        TypeName: string;

        Stereotype: IStereotype;

        X: number;
        Y: number;
        Width: number;

        Height: number;
        Center: IPoint;

        static selectedView;

        private dragStartCallbacks = new Array<IEventCallback>();
        private draggingCallbacks = new Array<IEventCallback>();
        private dragEndCallbacks = new Array<IEventCallback>();
        private clickCallbacks = new Array<IEventCallback>();
        
        constructor() {
            super();

            this.Center = new Point();

            this.X = 10;
            this.Y = 10;
            this.Width = 302;
            this.Height = 102;

            this.recalculateCenter();
        }

        setUpFromObject(object: IDiagramPart) {
            super.setUpFromObject(object);

            this.recalculateCenter();
        }

        recalculateCenter(): void {
            this.Center.X = this.X + (this.Width / 2);
            this.Center.Y = this.Y + (this.Height / 2);
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
                // ReSharper disable once SuspiciousThisUsage
                that.dragging(this);

            })
                .on("dragend", function () {
                //we're done, end some stuff
                that.dragEnd();
            });

            d3.selectAll(domElement.toArray()).call(drag);
        }

        dragStart(): void {
         
            this.dragStartCallbacks.forEach(callback => {
                callback(this, null);
            });

        }

        private dragCnt = 0;

        dragging(domElement: any): void {

            this.d3Dragging(domElement);

            if (this.dragCnt % 4 === 2) {
                this.save();

                this.draggingCallbacks.forEach(callback => {
                    callback(this, null);
                });
            }

            this.dragCnt++;
        }

        private d3Dragging(domElement: any): void {

            var sel = d3.select(domElement);
            var x = sel.attr("x");
            var y = sel.attr("y");

            var xNext = parseInt(x, 10) + d3.event.dx;
            var yNext = parseInt(y, 10) + d3.event.dy;

            sel.attr("x", xNext);
            sel.attr("y", yNext);

            this.X = xNext;
            this.Y = yNext;
        }

        dragEnd(): void {

            if (this.dragCnt === 0) {
                console.log("just clicked");

                this.clickCallbacks.forEach(callback => {
                    callback(this, "clicked");
                });

                BaseView.selectedView = this;

            } else {

                this.dragEndCallbacks.forEach(callback => {
                    callback(this, null);
                });

                this.save();
            }

            this.dragCnt = 0;
        }

        addClickEventListener(callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.clickCallbacks, callback);
        }

        addDragStartEventCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.dragStartCallbacks, callback);
        }

        addDraggingEventCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.draggingCallbacks, callback);
        }

        addDragEndtEventCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.dragEndCallbacks, callback);
        }

    }

    export class UseCaseView extends BaseView {

        Cx = 151;    //center of the ellipse
        Cy = 51;
        Rx = 150;    //radius
        Ry = 50;

        constructor() {
            super();
        }

        static service;
        save() {
            UseCaseView.service.modify(this);
        }

        deleteElement(): void {
            UseCaseView.service.deleteEntity(this);
        }
    }

    export class ActorView extends BaseView {
        Width = 62;
        Height = 127;

        static service;
        save() {
            ActorView.service.modify(this);
        }

        deleteElement(): void {
            ActorView.service.deleteEntity(this);
        }
    }
} 