/*
 ngCharts
 (c) 2016 Greg Raaum (greg.raaaum@yahoo.com)
 License: MIT
*/

var ngCharts = angular.module('ngCharts',['ngPieChart','ngBarChart']);        

ngCharts.controller("ngChartsCtrl", function($scope) {

    $scope.pie1 = {
        id: 'pie1',
        centerX: 150,
        centerY: 150,
        radius: 80,
        fontStyle: '12pt Open Sans',
        fontHeight: 12,
        slices : [
            { value: 50,  color: '#A62E5C', label : { text: 'Consulting' }  },
            { value: 100, color: '#9BC850', label : { text: 'Programming' }  },
            { value: 75,  color: '#F15B2A', label : { text: 'IT'  }  },
            { value: 50,  color: '#675BA7', label : { text: 'Secretarial'  }  }
        ]
    };

    $scope.pie2 = {
        id: 'pie2',
        centerX: 150,
        centerY: 150,
        radius: 80,
        fontStyle: '12pt Open Sans',fontHeight: 12,
        slices : [ 
            { value: 75, color: '#A62E5C', label : { text: 'Math' }  },
            { value: 35, color: '#9BC850', label : { text: 'Science' }  },
            { value: 90, color: '#F15B2A', label : { text: 'Gym' }  },
            { value: 80, color: '#675BA7', label : { text: 'History' }  } 
        ] 
    };

    $scope.bar1 = { 
        id: 'bar1',
        height: 40,
        padding:10,
        fontStyle: '12pt Open Sans',
        fontHeight: 12,
        gradientInterval: 50,
        gradients: [],
        bars: [ 
            { color: '#2A9FBC', width: 150, text: 'September' },
            { color: '#F15B2A', width: 160, text: 'October'   },
            { color: '#A62E5C', width: 190, text: 'November'  } 
        ]
    };

    $scope.bar2 = {
        id: 'bar2',
        height: 40,
        padding: 4,
        fontStyle: '12pt Open Sans',
        fontHeight: 12,
        gradientInterval: 50,
        gradients: [],
        bars: [ 
            { color: '#2A9FBC', width: 120, text: 'Auto Trader' },
            { color: '#A62E5C', width: 140, text: 'Car & Driver'  },
            { color: '#F15B2A', width: 80, text: 'Top Gear' }
        ]
    };  


});
