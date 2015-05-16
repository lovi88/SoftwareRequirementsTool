var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            _super.call(this);
            this.dragStartCallbacks = new Array();
            this.draggingCallbacks = new Array();
            this.dragEndCallbacks = new Array();
            this.clickCallbacks = new Array();
            this.dragCnt = 0;
            this.Center = new Entities.Point();
            this.X = 10;
            this.Y = 10;
            this.Width = 302;
            this.Height = 102;
            this.recalculateCenter();
        }
        BaseView.prototype.setUpFromObject = function (object) {
            _super.prototype.setUpFromObject.call(this, object);
            this.recalculateCenter();
        };
        BaseView.prototype.recalculateCenter = function () {
            this.Center.X = this.X + (this.Width / 2);
            this.Center.Y = this.Y + (this.Height / 2);
        };
        BaseView.prototype.applyDraggable = function (domElement) {
            var that = this;
            var drag = d3.behavior.drag().on("dragstart", function (d) {
                //do some drag start stuff...
                //this : actual domElement
                that.dragStart();
            }).on("drag", function (d) {
                //hey we're dragging, let's update some stuff
                // ReSharper disable once SuspiciousThisUsage
                that.dragging(this);
            }).on("dragend", function () {
                //we're done, end some stuff
                that.dragEnd();
            });
            d3.selectAll(domElement.toArray()).call(drag);
        };
        BaseView.prototype.dragStart = function () {
            var _this = this;
            this.dragStartCallbacks.forEach(function (callback) {
                callback(_this, null);
            });
        };
        BaseView.prototype.dragging = function (domElement) {
            var _this = this;
            this.d3Dragging(domElement);
            if (this.dragCnt % 4 === 2) {
                this.save();
                this.draggingCallbacks.forEach(function (callback) {
                    callback(_this, null);
                });
            }
            this.dragCnt++;
        };
        BaseView.prototype.d3Dragging = function (domElement) {
            var sel = d3.select(domElement);
            var x = sel.attr("x");
            var y = sel.attr("y");
            var xNext = parseInt(x, 10) + d3.event.dx;
            var yNext = parseInt(y, 10) + d3.event.dy;
            sel.attr("x", xNext);
            sel.attr("y", yNext);
            this.X = xNext;
            this.Y = yNext;
        };
        BaseView.prototype.dragEnd = function () {
            var _this = this;
            if (this.dragCnt === 0) {
                console.log("just clicked");
                this.clickCallbacks.forEach(function (callback) {
                    callback(_this, "clicked");
                });
                Entities.DiagramPart.clicked(this);
            }
            else {
                this.dragEndCallbacks.forEach(function (callback) {
                    callback(_this, null);
                });
                this.save();
            }
            this.dragCnt = 0;
        };
        BaseView.prototype.addClickEventListener = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.clickCallbacks, callback);
        };
        BaseView.prototype.addDragStartEventCallback = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.dragStartCallbacks, callback);
        };
        BaseView.prototype.addDraggingEventCallback = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.draggingCallbacks, callback);
        };
        BaseView.prototype.addDragEndtEventCallback = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.dragEndCallbacks, callback);
        };
        return BaseView;
    })(Entities.DiagramPart);
    Entities.BaseView = BaseView;
    var UseCaseView = (function (_super) {
        __extends(UseCaseView, _super);
        function UseCaseView() {
            _super.call(this);
            this.Cx = 151; //center of the ellipse
            this.Cy = 51;
            this.Rx = 150; //radius
            this.Ry = 50;
        }
        UseCaseView.prototype.save = function () {
            UseCaseView.service.modify(this);
        };
        UseCaseView.prototype.deleteElement = function () {
            UseCaseView.service.deleteEntity(this);
        };
        return UseCaseView;
    })(BaseView);
    Entities.UseCaseView = UseCaseView;
    var ActorView = (function (_super) {
        __extends(ActorView, _super);
        function ActorView() {
            _super.apply(this, arguments);
            this.Width = 62;
            this.Height = 127;
        }
        ActorView.prototype.save = function () {
            ActorView.service.modify(this);
        };
        ActorView.prototype.deleteElement = function () {
            ActorView.service.deleteEntity(this);
        };
        return ActorView;
    })(BaseView);
    Entities.ActorView = ActorView;
    var ConnectionView = (function (_super) {
        __extends(ConnectionView, _super);
        function ConnectionView(element) {
            _super.call(this);
            this.Element = element;
        }
        return ConnectionView;
    })(Entities.DiagramPart);
    Entities.ConnectionView = ConnectionView;
})(Entities || (Entities = {}));
//# sourceMappingURL=Views.js.map