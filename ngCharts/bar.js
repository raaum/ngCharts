var ngBarChart = angular.module('ngBarChart', []);

ngBarChart.directive("bar", function() {

    return {

        scope: { specs: '=' },

        templateUrl: './templates/ngCharts/bar.html',

        link: function(scope, element, attrs) {

            var gradients = [];

            scope.specs.labelWidth = 0;

            scope.specs.overallWidth = 0;

            var ctx = document.createElement('canvas').getContext('2d');

            ctx.font = scope.specs.fontStyle;

            angular.forEach(scope.specs.bars, function(bar, index) {

                var labelWidth = scope.specs.labelWidth;

                var overallWidth = scope.specs.overallWidth;

                var textWidth = ctx.measureText(bar.text).width;

                scope.specs.labelWidth = Math.max(labelWidth, textWidth);

                scope.specs.overallWidth = Math.max(overallWidth, bar.width);

                var id = scope.specs.id + '_' + index;

                bar.barStyle = 'animation: ' + id + ' .5s linear; animation-fill-mode: forwards';

                var animationDefinition = '@keyframes ' + id + ' { from { width: 0px; }  to { width: ' + bar.width + 'px; } }';

                document.styleSheets[0].insertRule(animationDefinition, 0);

            });
            
            for (var i=0; ; i += scope.specs.gradientInterval) {

                var overallWidth = scope.specs.overallWidth;

                gradients.push({ text: i, offset: i });

                if (i > overallWidth) { break; }

            }

            scope.specs.gradients = gradients;

            var height = scope.specs.height;

            var pad= scope.specs.padding;

            var hpad = ( 1 * height + pad );

            var lbars = scope.specs.bars.length;

            scope.specs.overallHeight = ( lbars * hpad );

        }
    }
})