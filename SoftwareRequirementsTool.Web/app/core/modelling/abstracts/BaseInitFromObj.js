var Modelling;
(function (Modelling) {
    var BaseInitFromObj = (function () {
        function BaseInitFromObj() {
        }
        BaseInitFromObj.prototype.initFromObj = function (obj) {
            if (!obj) {
                return;
            }
            for (var attrKey in obj) {
                if (obj.hasOwnProperty(attrKey)) {
                    this[attrKey] = obj[attrKey];
                }
            }
        };
        return BaseInitFromObj;
    })();
    Modelling.BaseInitFromObj = BaseInitFromObj;
})(Modelling || (Modelling = {}));
//# sourceMappingURL=BaseInitFromObj.js.map