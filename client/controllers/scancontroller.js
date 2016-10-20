//Controller for Scan.html
myApp.controller('scancontroller', function($scope,$route,$location, $window,resumefactory, resultsfactory) {

    $scope.scanResume = function(){
        resumefactory.postData($scope.scan, function(data){
            $scope.postData = data;
            $location.url('/results');
        });
    };

});
