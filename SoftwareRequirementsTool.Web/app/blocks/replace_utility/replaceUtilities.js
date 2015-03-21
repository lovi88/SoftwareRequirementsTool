var Utils = Utils || {};


/// Replace element with it's first child
Utils.replaceWithChild = function (element) {
    var child = angular.element(element[0].firstChild);
    //Utils.mergeAttributes(element, child);
    element.replaceWith(child);
}

/// Copy attributes from sourceElement to targetElement, merging their values if the attribute is already present
Utils.mergeAttributes = function (sourceElement, targetElement) {
    var arr = sourceElement[0].attributes;
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!item.specified)
            continue;

        var key = item.name;
        var sourceVal = item.value;
        var targetVal = targetElement.attr(key);

        if (sourceVal === targetVal)
            continue;

        var newVal = targetVal === undefined
            ? sourceVal
            : sourceVal + ' ' + targetVal;

        targetElement.attr(key, newVal);
    }
}