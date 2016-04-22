var ngGaugeChart = angular.module('ngGaugeChart', []);

ngGaugeChart.directive("gauge", function() {

    return {

        scope: { specs: '=' },

        templateUrl: './templates/ngCharts/gauge.html',

        link: function( scope, element, attrs ) {

            var maxValue  = scope.specs.maxValue;

            var gradInt   = scope.specs.gradientInterval;

            var offCount  = 100/(maxValue/gradInt);

            for (var gradValue = 0, offSet = 0; gradValue < maxValue; gradValue += gradInt, offSet += offCount) {

                scope.specs.gradients.push({ value: gradValue, offset: offSet + '%' });

            }
            var buildArc = function( start, end, radius ) {

                var px = scope.specs.centerX;

                var py = scope.specs.centerY;

                var startPoint = getAxisPoints( px, py, radius, start );

                var endPoint = getAxisPoints( px, py, radius, end );

                var arc = ["M", startPoint.x, startPoint.y, "A", radius, radius, 0, 0, 1, endPoint.x, endPoint.y];

                return arc.join(" ");

            }
            var getAxisPoints = function( pointX, pointY, radius, degrees ) { //get coordinates for angle

                var angleRad = (degrees - 180 ) * Math.PI / 180.0;

                return {
                    x: parseInt(pointX + (radius * Math.cos(angleRad))),
                    y: parseInt(pointY + (radius * Math.sin(angleRad))) 
                }

            }
            var generateGauge = function() {

                var x                     = scope.specs.centerX;

                var y                     = scope.specs.centerY;

                var radius                = scope.specs.radius;

                var currVal               = scope.specs.currentValue;

                var gaugeID               = scope.specs.id;

                scope.value               = buildArc( 0, currVal, radius );

                scope.background          = buildArc( 0, 180, radius );

                scope.gradients           = buildArc( 0, 180, (radius + 10) );

                scope.maxValueCoordinates = getAxisPoints( x, y, radius + 10, 180 );

                scope.dashArray           = 'animation: ' + gaugeID + ' .7s linear; animation-fill-mode: forwards;';

                var axisLength            = Math.ceil(currVal * (Math.PI/180) * radius);

                var animation             = '@keyframes ' + gaugeID + ' { from {stroke-dasharray: 0 ' + axisLength + ' } to { stroke-dasharray: ' + axisLength + ' 0 } }';

                document.styleSheets[0].insertRule(animation,0);
            }

            generateGauge();
        }
    }
});

