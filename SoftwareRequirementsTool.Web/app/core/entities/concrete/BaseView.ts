module Entities {
    //TODO: View Revise

    declare var d3: any;
    export class BaseView
        extends BaseEntity
        implements IView, IDraggable {

            Id: number;
            TypeName: string;

            Stereotype: IStereotype;

            Coordinates: IPoint;
            Width: number;

            Height: number;
            Center: IPoint;
            TextPosition: IPoint;

            private dragStartListeners = new Array<IOccurationListener>();
            private dragingListeners = new Array<IOccurationListener>();
            private dragEndListeners = new Array<IOccurationListener>();

            private dragStartCallbacks = new Array<IEventCallback>();
            private draggingCallbacks = new Array<IEventCallback>();
            private dragEndCallbacks = new Array<IEventCallback>();


            constructor() {
                super();

                this.Coordinates = new Point();
                this.Center = new Point();
                this.TextPosition = new Point();

                this.Coordinates.X = 10;
                this.Coordinates.Y = 10;
                this.Width = 302;
                this.Height = 102;

                this.recalculateCenter();
                this.recalculateTextPosition(10);
            }

            recalculateTextPosition(txtLen?: number): void {
                this.TextPosition.Y = (this.Width / 2) - 30;
                if (txtLen) {
                    this.TextPosition.X -= txtLen;
                }

                this.TextPosition.Y = (this.Height / 2) + 2;
            }

            recalculateCenter(): void {
                this.Center.X = this.Coordinates.X + (this.Width / 2);
                this.Center.Y = this.Coordinates.Y + (this.Height / 2);
            }

            applyDraggable(domElement: any): void {

                var that = this;
                var drag: any = d3.behavior.drag()
                    .on("dragstart", function(d) {
                        //do some drag start stuff...
                        //this : actual domElement
                        that.dragStart();
                    })
                    .on("drag", function(d) {
                        //hey we're dragging, let's update some stuff    
                        // ReSharper disable once SuspiciousThisUsage
                        that.dragging(this);

                    })
                    .on("dragend", function() {
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
                if (this.dragCnt % 2 === 0) {
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
                var x = sel.attr("x");
                var y = sel.attr("y");

                var xNext = parseInt(x, 10) + d3.event.dx;
                var yNext = parseInt(y, 10) + d3.event.dy;

                sel.attr("x", xNext);
                sel.attr("y", yNext);

                this.Coordinates.X = xNext;
                this.Coordinates.Y = yNext;
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


            save(): void {

            }

            rollback(): void {

            }

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

            setService(service: IServerService) {}

            setUpFromObject(object) {}


        }
} 