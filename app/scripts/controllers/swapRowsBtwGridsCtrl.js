'use strict';

/**
 * @ngdoc function
 * @name sampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleApp
 */

 angular.module('sampleApp')
    .controller('MainCtrl', function ($scope, $http) {

    $scope.leftToRightSelections = [];
    $scope.rightToLeftSelections = [];
    $scope.disabledright = true;
    $scope.disabledleft = true;
   
    $scope.leftgridOptions = { 
                data: 'userInfoData.workGroup',
                columnDefs: [
                             {
                                 field: 'name',
                                 displayName: 'Name'
                             },
                             {
                                 field: 'affiliate',
                                 displayName:'Affiliate'
                             }],
                             enableColumnResize: true,
                             enableRowSelection: true,
                             multiSelect: true,
                             keepLastSelected: false,
                             selectedItems: $scope.leftToRightSelections,
                             afterSelectionChange: function () {
                                 if($scope.leftToRightSelections.length > 0){
                                     $scope.disabledright = false;
                                 }
                                 else{
                                     $scope.disabledright = true;
                                 }
                             }
    };

    $scope.rightgridOptions = { 
                data: 'groupGridData.workGrouplist',
                columnDefs: [
                             {
                                 field: 'name',
                                 displayName: 'Name'
                             },
                             {
                                 field: 'affiliate',
                                 displayName:'Affiliate'
                             }],
                             enableColumnResize: true,
                             enableRowSelection: true,
                             multiSelect: true,
                             selectedItems: $scope.rightToLeftSelections,
                             afterSelectionChange: function () {
                                 if ($scope.rightToLeftSelections.length > 0) { 
                                      $scope.disabledleft = false;
                                 }  
                                 else{
                                      $scope.disabledleft = true;
                                 }
                             }              
    };

    $http.get('mock/getAllWorkGroups.json').success(function(data){
                $scope.groupGridData = data;

               // console.log(angular.toJson(data));
    });    

    $http.get('mock/workGroups.json').success(function(data){
                $scope.userInfoData = data;

               // console.log(angular.toJson(data));
    });  

    $scope.grpRightClick = function() {
        
        for(var i=0; i<$scope.leftToRightSelections.length; i++){
           for(var j=$scope.userInfoData.workGroup.length-1; j>=0; j--){
              if($scope.leftToRightSelections[i] === $scope.userInfoData.workGroup[j]){
                 $scope.groupGridData.workGrouplist.push($scope.userInfoData.workGroup[j]);
                 $scope.userInfoData.workGroup.splice(j, 1);   
              }
           }
        }
        $scope.leftToRightSelections.splice(0, $scope.leftToRightSelections.length); 
        $scope.disabledright = true;
    };

    $scope.grpLeftClick = function() {
        
        for(var i=0; i<$scope.rightToLeftSelections.length; i++){
           for(var j=$scope.groupGridData.workGrouplist.length-1; j>=0; j--){
              if($scope.rightToLeftSelections[i] === $scope.groupGridData.workGrouplist[j]){
                 $scope.userInfoData.workGroup.push($scope.groupGridData.workGrouplist[j]);
                 $scope.groupGridData.workGrouplist.splice(j, 1);   
              }
           }
        }
        $scope.rightToLeftSelections.splice(0, $scope.rightToLeftSelections.length);
        $scope.disabledleft = true;
    };
});

