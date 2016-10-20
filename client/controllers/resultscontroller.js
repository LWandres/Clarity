//Controller for the results view
myApp.controller('resultscontroller', function($scope,$route,$location,resumefactory,resultsfactory) {
    var postData = resumefactory.getData();

    resumefactory.createDescriptionMap(postData.job_description, function(data) {
        $scope.descriptionData = data;
        $scope.totalJobWords = $scope.descriptionData.count();
    });

    resumefactory.createResumeMap(postData.resume_input, function(data) {
        $scope.resumeData = data;
        $scope.totalResumeWords = $scope.resumeData.count();
        $scope.totalActionWords = $scope.totalActionCount;
    });

    resumefactory.checkMatchingWords($scope.descriptionData,$scope.resumeData, function(data){
        $scope.matchData = data;
        $scope.totalMatch = $scope.matchData._count;
    });

    resultsfactory.calcuations($scope, function(data){
        $scope.resultsData = data;
    });
});
