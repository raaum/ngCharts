var ngPieChart = angular.module('ngPieChart', []);

ngPieChart.directive("pie", function() {

    return {

        scope: { specs: '=' },

        templateUrl: './templates/ngCharts/pie.html',

        link: function(scope, element, attrs) {

            var x1 = scope.specs.radius, y1 = 0, total = 0, lastEndAngle = 0;

            angular.forEach(scope.specs.slices, function(slice, i) {

                total += parseInt(slice.value);

            });

            angular.forEach(scope.specs.slices, function(slice, i) {

                slice.x1 = x1;

                slice.y1 = y1;

                slice.endAngle = (slice.value/total * 360) + lastEndAngle;

                var radians = slice.endAngle * ( Math.PI / 180);

                slice.x2 = (Math.cos(radians) * scope.specs.radius);

                slice.y2 = (Math.sin(radians) * scope.specs.radius);

                x1 = slice.x2;

                y1 = slice.y2;

                lastEndAngle = slice.endAngle;

            });

            angular.forEach(scope.specs.slices, function(slice, i) {

                var angle = i == 0 ? slice.endAngle / 2 : slice.endAngle - (slice.endAngle - lastEndAngle) / 2;

                var radians = angle * ( Math.PI / 180 );

                var ticX = Math.cos(radians) * scope.specs.radius;

                var ticY = Math.sin(radians) * scope.specs.radius;

                var id = scope.specs.id+'_'+i;

                slice.opacitySetting = 'animation: ' + id + ' 1s linear; animation-delay: ' + i + 's; animation-fill-mode: forwards';

                var animationDefinition = '@keyframes ' + id + '{ from { opacity: 0.0; }  to { opacity: 1.0}; }';

                document.styleSheets[0].insertRule(animationDefinition, 0);

                slice.label.x = Math.cos(radians) * (scope.specs.radius + 20);

                slice.label.y = Math.sin(radians) * (scope.specs.radius + 20);

                slice.label.alignment = alignLabel(angle);

                slice.label.adjustment = adjustLabel(angle);

                slice.ticMark = { x: parseInt(ticX), y: parseInt(ticY), rotation: parseInt(angle) };

                lastEndAngle = slice.endAngle;
            });

            function alignLabel(s) {
                if      ( s < 45  ) { return "start";  }
                else if ( s < 135 ) { return "middle"; }
                else if ( s < 225 ) { return "end" ;   }
                else if ( s < 315 ) { return "middle"; }
                else                { return "start";  }
            }

            function adjustLabel(s) {
                return s > 225 && s < 315 ? 15 : 0;
            }
        }
    }
});
