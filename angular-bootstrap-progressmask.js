// TODO: auto-progress it (refer to ngprogress-lite)
angular.module("ui.bootstrap.progressmask", ["ui.bootstrap.progressbar"])
.directive("progressMask", function ($compile) {
    return {
        restrict: "A",
        scope: {
            progressMask: "=progressMask"
        },
        link: function (scope, element, attrs) {
            var progressMask = scope.progressMask;

            progressMask.value = progressMask.value || 100;
            progressMask.max = progressMask.max || 100;
            progressMask.type = progressMask.type || "info";
            progressMask.animate = progressMask.animate !== false;

            // Adapted from http://stackoverflow.com/a/2941203/940030
            // NOTE: use rgba instead of opacity so that it wouldn't affect the progressbar element
            // TODO: see if it's worth to put in separate CSS file
            var modalStyle = "width: 100%; height: 100%; position: absolute; background-color: rgba(128, 128, 128, 0.7); box-shadow: 4px 4px 20px 0px rgba(50, 50, 50, 0.7); border-radius: 4px";
            var progressbarWrapperStyle = "position: absolute; top: 50%; height: 20px; margin-top: -10px; width: 100%; padding: 0 10px";
            var progressbar = $compile(
                '<div style="' + modalStyle + '" ng-show="progressMask.active">' + 
                    '<div style="' + progressbarWrapperStyle + '">' + 
                        '<progressbar class="progress-striped active" ' + 
                            'max="' + progressMask.max + '" ' +
                            'animate="' + progressMask.animate + '" ' + 
                            'value="progressMask.value" ' + 
                            'type="' + progressMask.type + '">' + 
                            '{{progressMask.text}}' + 
                        '</progressbar>' + 
                    '</div>' + 
                '</div>'
            )(scope);

            element.css("position", "relative");

            element.prepend(progressbar);
        }
    };
})
.factory("progressMaskFactory", function () {
    return function progressMaskFactory(opts) {
        opts = opts || {};

        // construct
        var progressMask = {

            active: false,
            text: "",

            // ui-bootstrap specific
            // has default value handling in the directive
            value: opts.value,
            max: opts.max,
            type: opts.type,
            animate: opts.animate,

            activate: function activate(text) {
                this.active = true;
                this.text = text || "Loading";
                return this;
            },

            deactivate: function deactivate() {
                this.active = false;
                this.text = "";
                return this;
            }
        };

        return progressMask;
    };
})
;