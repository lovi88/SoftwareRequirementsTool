var AngularUtils = AngularUtils || {}


AngularUtils
    .safeApply = function ($scopeContext, fn) {
        var phase = $scopeContext.$root.$$phase;
        if (phase === "$apply" || phase === "$digest") {
            if (fn && (typeof (fn) === "function")) {
                fn();
            }
        } else {
            $scopeContext.$apply(fn);
        }
    };