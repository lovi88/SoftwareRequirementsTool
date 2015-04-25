var AngularUtils = AngularUtils || {}


AngularUtils
    .safeApply = function ($scopeContext, fn) {
        if (Utils.TypeChecker.isUndefinedOrNull($scopeContext.$root)) {
            return;
        }

        var phase = $scopeContext.$root.$$phase;

        if (phase === "$apply" || phase === "$digest") {
            if (fn && (typeof (fn) === "function")) {
                fn();
            }
        } else {
            $scopeContext.$apply(fn);
        }
    };